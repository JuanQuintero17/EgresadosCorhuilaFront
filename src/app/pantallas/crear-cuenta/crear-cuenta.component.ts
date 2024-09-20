import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserDto } from 'src/app/model/create-user-dto';
import { PreRegistro } from 'src/app/model/pre-registro';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import imageCompression from 'browser-image-compression';

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
  alertMessage: string = ''; // Inicialmente vacío
  isVisible: boolean = false;
  icon: string = '';

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
    password:'',
    file: null as number[] | null,
  }
  ngOnInit(): void {
    
  }

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const options = {
        maxSizeMB: 0.2, 
        maxWidthOrHeight: 1024, 
        useWebWorker: true,
        initialQuality: 0.4,
        alwaysKeepResolution: false 
      };

      try {
       
        const compressedFile = await imageCompression(file, options);
        
        
        const reader = new FileReader();
        reader.onload = () => {
          const byteArray = new Uint8Array(reader.result as ArrayBuffer);
          this.registerData.file = Array.from(byteArray); 
        };
        reader.readAsArrayBuffer(compressedFile);
      } catch (error) {
        console.error('Error al comprimir la imagen:', error);
      }
    }
  }

  OnRegister(): void{
    const rol = ["ROL_EGRESADO"]
    const dto = new CreateUserDto(this.registerData.document, this.registerData.institutionalEmail, this.registerData.password, rol);
    this.authService.register(dto).subscribe(
      data => {
        console.log("Registro exitoso");
        console.log(data);
        
        this.preRegister();
        
        
      },
      err => {
        console.log(err.error.message);
        this.alertMessage = err.error.message;
        this.isVisible = true;
        this.icon = 'fas fa-check-circle';
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
    this.registerData.telephone,
    this.registerData.file
    );

    this.authService.preRegister(dtoPreRegistro).subscribe(
      data => {
        console.log("Pre Registro echo exitosamente");
        this.router.navigate(['/login']);
        this.alertMessage = data.message;
        this.isVisible = true;
        this.icon = 'fas fa-check-circle';
      },err => {
        console.log(err.error.message);
        
      }
    )
  }

}
