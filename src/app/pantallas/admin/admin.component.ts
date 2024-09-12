import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUserDto } from 'src/app/model/login-user-dto';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  showPassword: boolean = false;

  formData = {
    username: '',
    password: ''
  };
  showError = false;

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

}
