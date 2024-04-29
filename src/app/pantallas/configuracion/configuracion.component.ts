import { Component } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent {

  showPassword: boolean = false;

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

}
