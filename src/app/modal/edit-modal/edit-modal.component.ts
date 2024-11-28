import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  input,
  Input,
  Output,
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FireService } from '../../services/fire.service';
import { Recipe } from '../../model/recipe';
import { of } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.css',
})
export class EditModalComponent {
  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<any>();

  @Input()
  id: any;

  //nuevoid = input.required();

  fb = inject(FormBuilder);
  recipeForm!: FormGroup;
  fire = inject(FireService);
  data: any;

  constructor() {
    this.recipeForm = this.fb.group({
      strMeal: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      strInstructions: new FormControl('', [Validators.required]),
      strMealThumb: new FormControl('', [Validators.required]),
      strYoutube: new FormControl(''),
      strIngredients: new FormControl('', [Validators.required]),
    });
  }

  ngOnChanges() {
    this.loadRecipe();
  }

  closeModal() {
    history.back();
  }
  // Escucha cambios en el historial del navegador
  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    this.onClose.emit('Me cierro');
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }
  async loadRecipe() {
    //this.isLoading = true;
    console.log(this.id);
    try {
      this.fire.getRecipesById(this.id).subscribe((recipe) => {
        this.recipeForm.patchValue(recipe);
      });
    } catch (err) {
      console.log(err);
    }
  }
  async editRecipe() {
    if (this.recipeForm.invalid) {
      return;
    }

    try {
      let idMeal = Math.random().toString(36).substring(2, 15);
      let recipe = {
        idMeal: idMeal,
        strMeal: this.recipeForm.value.strMeal,
        strMealThumb: this.recipeForm.value.strMealThumb,
        strInstructions: this.recipeForm.value.strInstructions,
        strYoutube: this.recipeForm.value.strYoutube,
        strIngredients: this.recipeForm.value.strIngredients,
      };

      // alert(recipe.strInstructions);

      this.fire.editRecipe(this.id, recipe).then(() => {
        this.closeModal();
      });
    } catch (error) {
      alert('Error' + error);
    }
  }
}
