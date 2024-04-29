import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  showPassword: boolean = false;

  formData = {
    username: '',
    password: ''
  };
  showError = false;

  constructor(private router : Router){}

  login(): void {
    if (this.formData.username === 'usuario' && this.formData.password === 'contraseña') {
      console.log('Autenticación exitosa');
    } else {
      this.showError = true;
    }
  }

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

  entrar(){
    this.router.navigate(['/home']);
  }

}
