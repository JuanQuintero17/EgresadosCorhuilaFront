import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formulario/formulario.service';

@Component({
  selector: 'app-datos-laborales',
  templateUrl: './datos-laborales.component.html',
  styleUrls: ['./datos-laborales.component.css']
})
export class DatosLaboralesComponent implements OnInit{

  datosFormulario3: any = {};

  constructor(private formularioService : FormularioService, private router : Router){}

  ngOnInit(): void {
    this.datosFormulario3 = this.formularioService.obtenerDatosFormulario3();
  }

  guardarDatos(){
    this.formularioService.actualizarDatosFormulario3(this.datosFormulario3);
  }

  anteriorFormulario(){
    this.formularioService.actualizarDatosFormulario3(this.datosFormulario3);
    this.router.navigate(['/homeEgresado/datosEducacion'])
  }

}
