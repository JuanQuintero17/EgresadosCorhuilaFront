import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalErrorComponent } from 'src/app/modals/modal-error/modal-error.component';
import { LoginUserDto } from 'src/app/model/login-user-dto';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

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
    const dto = new LoginUserDto(this.formData.username, this.formData.password);
    this.authService.login(dto).subscribe(
      data => {
        this.tokenService.setToken(data.token)
        this.router.navigate(['/home/dashboard']);
      },
      err => {
        console.log('Error al iniciar sesion');
      }
    )
  }

  openModal(){
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
  }

}
