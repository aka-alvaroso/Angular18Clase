import {
  Component,
  inject,
  input,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FireService } from '../../services/fire.service';
@Component({
  selector: 'app-view-favorite',
  standalone: true,
  imports: [JsonPipe, CommonModule],
  templateUrl: './view-favorite.component.html',
  styleUrl: './view-favorite.component.css',
})
export class ViewFavoriteComponent {
  fire = inject(FireService);

  /*
   @Input()
   id: string | undefined;
  */
  id = input.required<string>();

  $state: WritableSignal<any> = signal({
    data: [],
    loading: true,
    error: null,
  });

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    // console.log('pollita');
    this.$state.update((state) => {
      return { ...state, loading: true };
    });
    let request = this.fire.getRecipesById(this.id());

    request?.subscribe({
      next: (data: any) => {
        this.$state.update((state) => {
          return { ...state, loading: false, data: data };
        });
      },
      error: (error: any) => {
        console.error(error);
        this.$state.update((state) => {
          return { ...state, loading: false, data: [], error: error };
        });
      },
    });
  }
}
