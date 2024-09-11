import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActualizarDatosService } from 'src/app/services/actualizar-datos.service';
import { FormularioService } from 'src/app/services/formulario/formulario.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-datos-educacion',
  templateUrl: './datos-educacion.component.html',
  styleUrls: ['./datos-educacion.component.css']
})
export class DatosEducacionComponent implements OnInit{

  datosFormulario2: any = {};

  constructor(
    private router: Router,
    private formularioService: FormularioService,
    private actualizarDatos: ActualizarDatosService,
    private tokenService: TokenService
  ){}

  ngOnInit(): void {
    this.datosFormulario2 = this.formularioService.obtenerDatosFormulario2();

    if(!this.formularioService.datosCargadosForm2){
      this.consultarDatos()
      this.formularioService.datosCargadosForm2 = true;
    }
  }

  consultarDatos() {
    const document =  Number(this.tokenService.getDocument())
    this.actualizarDatos.recuperarUsuario(document,false).subscribe(
      data => {
        console.log("formulario 2");
        
        const fechaGrado = new Date(data.fechaGrado);
        this.datosFormulario2.sedeUniversitaria = data.sedeUniversitaria;
        this.datosFormulario2.facultad = data.facultad;
        this.datosFormulario2.ultimoSemestreCursado = data.ultimoSemestre;
        this.datosFormulario2.fechaGrado = fechaGrado.toISOString().split('T')[0];
        this.datosFormulario2.calificacionObtenida = data.calificacionObtenida;
        this.datosFormulario2.tituloObtenido = data.tituloObtenido;
        this.datosFormulario2.ultimoNivelFormacion = data.ultimoNivelFormacion;
        this.datosFormulario2.programa = data.programa;
        this.datosFormulario2.graduado = data.graduado;
        this.datosFormulario2.modalidadGrado = data.modalidad;
        this.datosFormulario2.tituloTrabajoGrado = data.tituloTrabajoGrado;
      }

    )
  }

  siguienteFormulario(){
    this.formularioService.actualizarDatosFormulario2(this.datosFormulario2);
    console.log(this.datosFormulario2);
    this.router.navigate(['/homeEgresado/datosLaborales']);
  }

  anteriorFormulario(){
    this.formularioService.actualizarDatosFormulario2(this.datosFormulario2);
    this.router.navigate(['/homeEgresado/actualizar']);
  }
}
