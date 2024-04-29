import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  showPassword: boolean = false;
  showError = false;
  isModalOpen: boolean = false;
  isModal: boolean = false;

  formData = {
    username: '',
    password: ''
  };

  constructor(private router:Router){}

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

  openModal(){
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
  }

  openModalError(){
    this.isModal = true;
  }

  closeModalError(){
    this.isModal = false;
  }

  crearCuenta(){
    this.router.navigate(['/crearCuenta'])
  }

  entrar(){
    this.router.navigate(['/homeEgresado']);
  }
}
