import {
  Component,
  Input,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  api = inject(ApiService);
  router = inject(Router);

  $state: WritableSignal<any> = signal({
    type: 'nationality',
    loading: false,
    error: false,
    data: [],
  });

  @Input()
  set type(type: string) {
    //1 - Analizamos el valor
    //2 - LLamar al servicio

    //Hemso recibido un cambio en la ruta
    this.$state.update((state) => ({ ...state, loading: true, type: type }));

    let request: any;
    switch (type) {
      case 'category':
        request = this.api.getCategories();
        break;

      default:
        request = this.api.getNationalities();
    }

    request.subscribe(
      (data: any) => {
        this.$state.update((state) => ({
          ...state,
          loading: false,
          error: false,
          data: data.map((m: any) =>
            type == 'category' ? { name: m.strCategory } : { name: m.strArea }
          ),
        }));
      },
      (err: any) => {
        console.log(err);
        this.$state.update((state) => ({
          ...state,
          loading: false,
          error: true,
          data: [],
        }));
      }
    );
  }

  listRecipe(ingredient: string) {
    // Ir a la página /recipe/tipo/ingredient
    this.router.navigate(['recipes', this.$state().type, ingredient]);
  }
}
