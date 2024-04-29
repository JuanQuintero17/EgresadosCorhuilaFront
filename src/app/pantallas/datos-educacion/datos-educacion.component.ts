import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formulario/formulario.service';

@Component({
  selector: 'app-datos-educacion',
  templateUrl: './datos-educacion.component.html',
  styleUrls: ['./datos-educacion.component.css']
})
export class DatosEducacionComponent implements OnInit{

  datosFormulario2: any = {};

  constructor(
    private router: Router,
    private formularioService: FormularioService
  ){}

  ngOnInit(): void {
    this.datosFormulario2 = this.formularioService.obtenerDatosFormulario2();
  }

  siguienteFormulario(){
    this.formularioService.actualizarDatosFormulario2(this.datosFormulario2);
    this.router.navigate(['/homeEgresado/datosLaborales']);
  }

  anteriorFormulario(){
    this.formularioService.actualizarDatosFormulario2(this.datosFormulario2);
    this.router.navigate(['/homeEgresado/actualizar']);
  }
}
