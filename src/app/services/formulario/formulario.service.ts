import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  datosFormulario1: any = {};
  datosFormulario2: any = {};
  datosFormulario3: any = {};

  constructor(){}

  actualizarDatosFormulario1(datos: any) {
    this.datosFormulario1 = { ...datos };
  }

  actualizarDatosFormulario2(datos: any) {
    this.datosFormulario2 = { ...datos };
  }

  actualizarDatosFormulario3(datos: any) {
    this.datosFormulario3 = { ...datos };
  }

  obtenerDatosFormulario1() {
    return { ...this.datosFormulario1 };
  }

  obtenerDatosFormulario2() {
    return { ...this.datosFormulario2 };
  }

  obtenerDatosFormulario3() {
    return { ...this.datosFormulario3 };
  }
}
