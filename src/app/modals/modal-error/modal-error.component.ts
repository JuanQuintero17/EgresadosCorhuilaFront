import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.css']
})
export class ModalErrorComponent {

  @Input() message: string = 'Ocurrio un error';
  visible: boolean = false

  showError(message:string){
    this.message = message;
    this.visible = true;
  }

  handleCloseClick() {
    this.visible = false;
  }

}
