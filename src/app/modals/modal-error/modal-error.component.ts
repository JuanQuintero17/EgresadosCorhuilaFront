import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.css']
})
export class ModalErrorComponent {

  @Output() close = new EventEmitter<void>();

  handleCloseClick() {
    this.close.emit();
  }

}
