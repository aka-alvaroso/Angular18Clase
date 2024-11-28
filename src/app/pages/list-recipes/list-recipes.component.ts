import {
  Component,
  inject,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { Recipe } from '../../model/recipe';
import { FireService } from '../../services/fire.service';
import { FormModalComponent } from '../../modal/form-modal/form-modal.component';
import { ConfirmModalComponent } from '../../modal/confirm-modal/confirm-modal.component';
import { EditModalComponent } from '../../modal/edit-modal/edit-modal.component';

@Component({
  selector: 'app-list-recipes',
  standalone: true,
  imports: [
    NgClass,
    FormModalComponent,
    ConfirmModalComponent,
    EditModalComponent,
  ],
  templateUrl: './list-recipes.component.html',
  styleUrl: './list-recipes.component.css',
})
export class ListRecipesComponent {
  api = inject(ApiService);
  router = inject(Router);
  fire = inject(FireService);
  isModalOpen = false;
  activeIdRecipe: string = '';
  isConfirmModalOpen = false;
  isEditModalOpen = false;

  @Input()
  type: string = '';

  @Input()
  subtype: string = '';

  $state: WritableSignal<any> = signal({
    loading: false,
    error: false,
    data: {},
  });

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    // Llamar al servicio
    this.$state.update((state) => ({ ...state, loading: true }));

    let request;
    switch (this.type) {
      case 'category':
        request = this.api.getRecipesByCategory(this.subtype);
        break;
      case 'nationality':
        request = this.api.getRecipesByNationality(this.subtype);
        break;
      case undefined:
        // request = this.fire.getRecipes();
        request = this.fire.getRecipesWithID();
        break;
      default:
        request = null;
    }

    if (request) {
      // Subscrito al observable
      (request as any).subscribe({
        next: (data: any) => {
          const transformedData = data.reduce((acc: any, item: any) => {
            const { id, ...recipeData } = item;
            acc[id] = recipeData;
            return acc;
          }, {});

          this.$state.update((state) => ({
            ...state,
            loading: false,
            error: false,
            data: data,
          }));
        },
        error: (err: any) => {
          this.$state.update((state) => ({
            ...state,
            loading: false,
            error: err,
            data: {},
          }));
        },
      });
    } else {
      // Error
      this.$state.update((state) => ({
        ...state,
        loading: false,
        error: 'Categoría incorrecta',
      }));
    }
  }

  goToRecipe(idMeal: string) {
    // Navega a recipe/:id
    if (this.type == undefined) {
      this.router.navigate(['favorite', idMeal]);
    } else {
      this.router.navigate(['recipe', idMeal]);
    }
  }

  openConfirmModal(id: string) {
    this.activeIdRecipe = id;
    this.isConfirmModalOpen = true;
    history.pushState({}, document.title);
  }

  closeConfirmModal($event?: any) {
    if ($event) {
      console.log('Desde el componente que abre el modal' + $event);
    }
    this.isConfirmModalOpen = false;
  }

  openEditModal(id: string) {
    this.activeIdRecipe = id;
    this.isEditModalOpen = true;
    history.pushState({}, document.title);
  }

  closeEditModal($event?: any) {
    if ($event) {
      console.log('Desde el componente que abre el modal' + $event);
    }
    this.isEditModalOpen = false;
  }

  openModal() {
    this.isModalOpen = true;
    history.pushState({}, document.title);
  }

  closeModal($event?: any) {
    if ($event) {
      console.log('Desde el componente que abre el modal' + $event);
    }
    this.isModalOpen = false;
  }
}
