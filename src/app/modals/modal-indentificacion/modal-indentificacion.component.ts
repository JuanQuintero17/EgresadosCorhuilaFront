import { Component, EventEmitter, Output } from '@angular/core';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';

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

  constructor(
    private forgotPasswordService: ForgotPasswordService
  ){}

  datos = {
    noIdentificacion: ''
  }

  enviarPassword(){
    console.log(this.datos);
    const noIdentificacionNumber = Number(this.datos.noIdentificacion);
    this.forgotPasswordService.forgotPassword(noIdentificacionNumber).subscribe(
      data => {
        console.log(data);
        this.datos.noIdentificacion = ''
        this.handleCloseClick();
      }
    )
  }
  
}
