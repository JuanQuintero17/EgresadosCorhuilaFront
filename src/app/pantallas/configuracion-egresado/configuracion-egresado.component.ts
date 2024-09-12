import { Component, OnInit } from '@angular/core';
import { ActualizarPassword } from 'src/app/model/actualizar-password';
import { ActualizarDatosService } from 'src/app/services/actualizar-datos.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-configuracion-egresado',
  templateUrl: './configuracion-egresado.component.html',
  styleUrls: ['./configuracion-egresado.component.css']
})
export class ConfiguracionEgresadoComponent implements OnInit{

  showPassword: boolean = false;
  fotoPerfil: any
  constructor(
    private actualizarDatosService: ActualizarDatosService,
    private tokenService: TokenService
  ){

  }

  ngOnInit(): void {
    this.consulttarFoto();
    
  }

  actualizar= {
      password : '',
      email: '',
      identificacion: ''
  }

  consulttarFoto(){
    const document =  Number(this.tokenService.getDocument())
    this.actualizarDatosService.recuperarUsuario(document, true).subscribe(
      data => {
        const byteArray = data.fotoPerfil;
        this.actualizar.identificacion = data.noIdentificacion;
        this.actualizar.email = data.emailInstitucional;
      if (byteArray) {
        this.fotoPerfil = this.arrayBufferToBase64(byteArray);
      } else {
        console.error("No se encontró la foto de perfil.");
      }
      },err => {
        console.error("Error");
        
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

  private arrayBufferToBase64(buffer: number[]): string {
    const byteArray = new Uint8Array(buffer);
    const binary = byteArray.reduce((data, byte) => data + String.fromCharCode(byte), '');
    const base64 = window.btoa(binary);
    return `data:image/jpeg;base64,${base64}`; // Ajusta el tipo MIME según el tipo de imagen
  }

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

}
