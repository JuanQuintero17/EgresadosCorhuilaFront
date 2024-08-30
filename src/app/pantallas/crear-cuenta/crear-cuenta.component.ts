import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserDto } from 'src/app/model/create-user-dto';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent implements OnInit{

  constructor(
    private authService:AuthService,
    private tokenService:TokenService,
    private router:Router
  ){}

  showPassword: boolean = false;

  registerData = {
    name:'',
    personalEmail:'',
    dateBirth:'',
    typeDocument:'',
    city:'',
    telephone:'',
    lastName:'',
    institutionalEmail:'',
    year:'',
    document:'',
    addres:'',
    password:''
  }
  ngOnInit(): void {
    
  }

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

  OnRegister(): void{
    const rol = ["ROL_EGRESADO"]
    const dto = new CreateUserDto(this.registerData.document, this.registerData.institutionalEmail, this.registerData.password, rol);
    this.authService.register(dto).subscribe(
      data => {
        console.log("Registro exitoso");
        this.router.navigate(['/login'])
        
      },
      err => {
        console.log(err.error.message);
        
      }
    );
  }

}
