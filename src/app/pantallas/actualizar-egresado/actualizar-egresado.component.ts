import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formulario/formulario.service';

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
    private formularioService: FormularioService
  ){}

  ngOnInit(): void {
    this.datosFormulario1 = this.formularioService.obtenerDatosFormulario1();
  }

  siguienteFormulario(){
    this.formularioService.actualizarDatosFormulario1(this.datosFormulario1);
    this.router.navigate(['/homeEgresado/datosEducacion']);
  }

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }

}
