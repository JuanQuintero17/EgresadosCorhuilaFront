import { Component } from '@angular/core';

@Component({
  selector: 'app-configuracion-egresado',
  templateUrl: './configuracion-egresado.component.html',
  styleUrls: ['./configuracion-egresado.component.css']
})
export class ConfiguracionEgresadoComponent {

  showPassword: boolean = false;

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

}
