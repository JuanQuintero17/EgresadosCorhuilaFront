import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-indentificacion',
  templateUrl: './modal-indentificacion.component.html',
  styleUrls: ['./modal-indentificacion.component.css']
})
export class ModalIndentificacionComponent {

  @Output() close = new EventEmitter<void>();

  handleCloseClick() {
    this.close.emit();
  }
  
}
