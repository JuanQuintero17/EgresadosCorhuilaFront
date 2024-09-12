import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActualizarDatos } from '../model/actualizar-datos';
import { ActualizarPassword } from '../model/actualizar-password';

@Injectable({
  providedIn: 'root'
})
export class ActualizarDatosService {

  actualizarDatosURL = environment.apiResURL + '/egresados/';

  constructor(private httpClient: HttpClient) { }

  public recuperarUsuario(document: number, foto: boolean): Observable<any>{
    const params = new HttpParams()
      .set('doc', document.toString())
      .set('foto', foto.toString());
    return this.httpClient.post<any>(this.actualizarDatosURL + 'recuperarUsuarioDoc', null, {params})
  }

  public actualizarUsuario(document: number, dto: ActualizarDatos): Observable<any>{
    const params = new HttpParams().set('doc', document)
    return this.httpClient.post<any>(this.actualizarDatosURL + 'actualizarUsuario', dto, {params})
  }

  public actualizarPassword( dto: ActualizarPassword): Observable<any>{
    return this.httpClient.put<any>(this.actualizarDatosURL + 'actualizarContraseña', dto)
  }
}
