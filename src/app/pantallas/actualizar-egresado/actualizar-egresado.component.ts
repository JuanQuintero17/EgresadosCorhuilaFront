import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActualizarDatosService } from 'src/app/services/actualizar-datos.service';
import { FormularioService } from 'src/app/services/formulario/formulario.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-actualizar-egresado',
  templateUrl: './actualizar-egresado.component.html',
  styleUrls: ['./actualizar-egresado.component.css']
})
export class ActualizarEgresadoComponent implements OnInit{

  showPassword: boolean = false;
  datosFormulario1: any = {};

  constructor(
    private router: Router,
    private formularioService: FormularioService,
    private actualizarDatos: ActualizarDatosService,
    private tokenService: TokenService
  ){}

  ngOnInit(): void {
    this.datosFormulario1 = this.formularioService.obtenerDatosFormulario1();

   
    if(!this.formularioService.datosCargadosForm1){
      this.consultarDatos()
      this.formularioService.datosCargadosForm1 = true;
    }
    
    
  }

  consultarDatos() {
    const document =  Number(this.tokenService.getDocument())
    this.actualizarDatos.recuperarUsuario(document, false).subscribe(
      data => {
        console.log(data);
        
        const fechaNacimiento = new Date(data.fechaNacimiento);
        this.datosFormulario1.nombres = data.primerNombre + ' '+ data.segundoNombre;
        this.datosFormulario1.correoPersonal = data.email;
        this.datosFormulario1.fechaNacimiento = fechaNacimiento.toISOString().split('T')[0];
        this.datosFormulario1.documentoIdentidad = data.tipoDocumento;
        this.datosFormulario1.ciudadResidencia = data.ciudadRecidencia;
        this.datosFormulario1.telefonoCelular = data.telefono;
        this.datosFormulario1.apellidos = data.primerApellido + ' '+ data.segundoApellido;
        this.datosFormulario1.correoInstitucional = data.emailInstitucional;
        this.datosFormulario1.edad = data.edad;
        this.datosFormulario1.numeroIdentidad = data.noIdentificacion;
        this.datosFormulario1.direccionResidencia = data.direccionRecidencia;
        
      }

    )
  }



  siguienteFormulario(){
    this.formularioService.actualizarDatosFormulario1(this.datosFormulario1);
    console.log(this.datosFormulario1);
    
    this.router.navigate(['/homeEgresado/datosEducacion']);
  }

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

}
