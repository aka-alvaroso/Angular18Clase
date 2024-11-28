import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
import { FireService } from '../../services/fire.service';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css',
})
export class ConfirmModalComponent {
  fire = inject(FireService);

  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<any>();

  @Input()
  id: any;

  deleteRecipe(id: string) {
    // Obtener el ID del documento y eliminarlo
    console.log('Eliminando el documento con ID: ' + id);
    this.fire.deleteRecipe(id);
    this.closeModal();
  }

  closeModal() {
    history.back();
  }
  // Escucha cambios en el historial del navegador
  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    this.onClose.emit();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }
}
