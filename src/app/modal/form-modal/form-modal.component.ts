import {
  Component,
  EventEmitter,
  HostListener,
  inject,
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

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.css',
})
export class FormModalComponent {
  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<any>();

  fb = inject(FormBuilder);
  recipeForm!: FormGroup;
  fire = inject(FireService);

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

  async createRecipe() {
    if (this.recipeForm.invalid) {
      return;
    }

    try {
      let recipe = {
        idMeal: Math.random().toString(36).substring(2, 15),
        strMeal: this.recipeForm.value.strMeal,
        strMealThumb: this.recipeForm.value.strMealThumb,
        strInstructions: this.recipeForm.value.strInstructions,
        strYoutube: this.recipeForm.value.strYoutube,
        strIngredients: this.recipeForm.value.strIngredients,
      };

      // alert(recipe.strInstructions);

      let recipeRef = await this.fire.createRecipe(recipe);
      this.recipeForm.reset();
      this.closeModal();
    } catch (error) {
      alert('Error' + error);
    }
  }
}
