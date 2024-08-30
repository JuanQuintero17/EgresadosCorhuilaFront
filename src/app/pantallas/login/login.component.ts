import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalErrorComponent } from 'src/app/modals/modal-error/modal-error.component';
import { LoginUserDto } from 'src/app/model/login-user-dto';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  @ViewChild('errorModal') errorModal!:ModalErrorComponent;

  showPassword: boolean = false;
  showError = false;
  isModalOpen: boolean = false;
  isModal: boolean = false;

  formData = {
    username: '',
    password: ''
  };

  constructor(
    private authService:AuthService,
    private tokenService:TokenService,
    private router:Router
  ){}

  ngOnInit(): void {
    
  }

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
    const dto = new LoginUserDto(this.formData.username, this.formData.password);
    this.authService.login(dto).subscribe(
      data => {
        this.tokenService.setToken(data.token)
        this.router.navigate(['/homeEgresado']);
      },
      err => {
        console.log('Error al iniciar sesion');
        this.errorModal.showError('Error al iniciar sesion ')
        
      }
    )
  }
}
