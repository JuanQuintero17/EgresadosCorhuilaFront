import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserDto } from 'src/app/model/create-user-dto';
import { PreRegistro } from 'src/app/model/pre-registro';
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
        this.preRegister();
        this.router.navigate(['/login']);
        
      },
      err => {
        console.log(err.error.message);
        
      }
    );
  }

  preRegister(): void {
    
  let dateBirthString: string = this.registerData.dateBirth;
  let dateBirthObject: Date = new Date(dateBirthString);

  const firstName = this.registerData.name.split(" ")[0] || '';
  const secondName = this.registerData.name.split(" ")[1] || '';
  const firstLastName = this.registerData.lastName.split(" ")[0] || '';
  const secondLastName = this.registerData.lastName.split(" ")[1] || '';

  const dtoPreRegistro = new PreRegistro(
    firstName,
    secondName,
    firstLastName,
    secondLastName,
    this.registerData.personalEmail,
    this.registerData.institutionalEmail,
    dateBirthObject,
    this.registerData.year,
    this.registerData.typeDocument,
    this.registerData.document,
    this.registerData.city,
    this.registerData.addres,
    this.registerData.telephone
    );

    this.authService.preRegister(dtoPreRegistro).subscribe(
      data => {
        console.log("Pre Registro echo exitosamente");
        
      },err => {
        console.log(err.error.message);
        
      }
    )
  }

}
