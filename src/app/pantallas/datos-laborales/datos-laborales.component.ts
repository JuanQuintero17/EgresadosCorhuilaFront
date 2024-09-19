import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActualizarDatos } from 'src/app/model/actualizar-datos';
import { ActualizarDatosService } from 'src/app/services/actualizar-datos.service';
import { FormularioService } from 'src/app/services/formulario/formulario.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-datos-laborales',
  templateUrl: './datos-laborales.component.html',
  styleUrls: ['./datos-laborales.component.css']
})
export class DatosLaboralesComponent implements OnInit{

  datosFormulario3: any = {
    laboraActualmente: false, 
  };

  constructor(
    private formularioService : FormularioService, 
    private router : Router,
    private actualizarDatos: ActualizarDatosService,
    private tokenService: TokenService
  ){}

  ngOnInit(): void {
    this.datosFormulario3 = this.formularioService.obtenerDatosFormulario3();
    if(!this.formularioService.datosCargadosForm3){
      this.consultarDatos()
      this.formularioService.datosCargadosForm3 = true;
    }
  }

  consultarDatos() {
    const document =  Number(this.tokenService.getDocument())
    this.actualizarDatos.recuperarUsuario(document,false).subscribe(
      data => {
        
        console.log("Formulario 3");
        
        const fechaIngreso = new Date(data.fechaIngreso);
        this.datosFormulario3.progrlaboraActualmenteama = data.labora;
        this.datosFormulario3.rolEjecuta = data.rolEjecuta;
        this.datosFormulario3.actividadEjecuta = data.actividadEjecuta;
        this.datosFormulario3.tipoContrato = data.tipoContrato;
        this.datosFormulario3.ejecutaActividad = data.relacionFormacion;
        this.datosFormulario3.nombreEmpresa = data.nombreEmpresa;
        this.datosFormulario3.fechaIngreso = fechaIngreso.toISOString().split('T')[0];
        this.datosFormulario3.rangoSalario = data.rangoSalarial;
        this.datosFormulario3.modalidadTrabajo = data.modalidad;
        
      },err => {
        console.log(err.error.message);
        
      }

    )
    this.formularioService.actualizarDatosFormulario3(this.datosFormulario3);
  }

  onLaboraChange(): void {
    if (!this.datosFormulario3.laboraActualmente) {
      this.datosFormulario3.rolEjecuta = '';
      this.datosFormulario3.actividadEjecuta = '';
      this.datosFormulario3.tipoContrato = '';
      this.datosFormulario3.ejecutaActividad = '';
      this.datosFormulario3.nombreEmpresa = '';
      this.datosFormulario3.fechaIngreso = '';
      this.datosFormulario3.rangoSalario = '';
      this.datosFormulario3.modalidadTrabajo = '';
    }
  }

  guardarDatos() {
    this.formularioService.actualizarDatosFormulario3(this.datosFormulario3);

    const form1 = this.formularioService.obtenerDatosFormulario1();
    const form2 = this.formularioService.obtenerDatosFormulario2();
    const form3 = this.formularioService.obtenerDatosFormulario3();

    const firstName = form1.nombres.split(" ")[0] || '';
    const secondName = form1.nombres.split(" ")[1] || '';
    const firstLastName = form1.apellidos.split(" ")[0] || '';
    const secondLastName = form1.apellidos.split(" ")[1] || '';

    const document = Number(this.tokenService.getDocument());


    this.actualizarDatos.recuperarUsuario(document,false).subscribe(
      dataList => {
        const id = dataList.id;

        const dtoActualizaDatos = new ActualizarDatos(
          id,
          firstName,
          secondName,
          firstLastName,
          secondLastName,
          form1.correoPersonal,
          form1.correoInstitucional,
          form1.fechaNacimiento,
          form1.edad,
          form1.documentoIdentidad,
          form1.numeroIdentidad,
          form1.ciudadResidencia,
          form1.direccionResidencia,
          form1.telefonoCelular,
          form2.sedeUniversitaria,
          form2.ultimoNivelFormacion,
          form2.facultad,
          form2.ultimoSemestreCursado,
          form2.graduado,
          form2.fechaGrado,
          form2.modalidadGrado,
          form2.calificacionObtenida,
          form2.tituloTrabajoGrado,
          form2.programa,
          form2.tituloObtenido,
          form3.progrlaboraActualmenteama,
          form3.nombreEmpresa,
          form3.rolEjecuta,
          form3.fechaIngreso,
          form3.actividadEjecuta,
          form3.rangoSalario,
          form3.tipoContrato,
          form3.modalidadTrabajo,
          form3.ejecutaActividad
        );

        console.log(dtoActualizaDatos);

        this.actualizarDatos.actualizarUsuario(document, dtoActualizaDatos).subscribe(
          data => {
            console.log("Registro realizado exitosamente: " + data);
            this.router.navigate(['/homeEgresado/noticiasEgresado']);
          },
          err => {
            console.error('Error al actualizar el usuario:', err.error.message);
          }
        );
      },
      error => {
        console.error('Error al recuperar usuario:', error);
      }
    );
}

  anteriorFormulario(){
    this.formularioService.actualizarDatosFormulario3(this.datosFormulario3);
    this.router.navigate(['/homeEgresado/datosEducacion'])
  }

}
