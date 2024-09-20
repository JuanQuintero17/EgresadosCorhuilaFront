import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.css']
})
export class ModalErrorComponent {

  @Input() message: string = '';
  @Input() visible: boolean = false;
  @Input() title: string = '';
  @Input() icon: string = '';

  showError(message:string, icon: string = ''){
    this.message = message;
    this.icon = icon;
    this.visible = true;

    setTimeout(() => {
      this.visible = false;
    }, 5000);
  
  }

  handleCloseClick() {
    this.visible = false;
  }

  

}
