import { Component, OnInit } from '@angular/core';
import { ActualizarPassword } from 'src/app/model/actualizar-password';
import { ActualizarDatosService } from 'src/app/services/actualizar-datos.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit{

  showPassword: boolean = false;

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
    this.listarAdmin();
  }

  actualizar= {
    password : '',
    email: '',
    identificacion: ''
}

  constructor(
    private actualizarDatosService: ActualizarDatosService,
    private tokenService: TokenService
  ){}

  listarAdmin(){
    const document =  Number(this.tokenService.getDocument())
   this.actualizarDatosService.listarAdmin(document).subscribe(
    data => {
      console.log(data);
      this.actualizar.identificacion = data.noIdentificacion;
      this.actualizar.email = data.emailInstitucional;
    }
   )
  }

  actualizarPassword(){

    const dtoActualizarPassword = new ActualizarPassword(
      this.actualizar.identificacion,
      this.actualizar.password,
      this.actualizar.email
    )

    console.log(dtoActualizarPassword);
    

    this.actualizarDatosService.actualizarPassword(dtoActualizarPassword).subscribe(
      data => {
        console.log(data);
        this.actualizar.password = '';
      }
    ) 

  }

}
