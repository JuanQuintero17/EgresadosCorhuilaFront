import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActualizarDatos } from '../model/actualizar-datos';

@Injectable({
  providedIn: 'root'
})
export class ActualizarDatosService {

  actualizarDatosURL = environment.apiResURL + '/egresados/';

  constructor(private httpClient: HttpClient) { }

  public recuperarUsuario(document: number): Observable<any>{
    const params = new HttpParams().set('doc', document)
    return this.httpClient.post<any>(this.actualizarDatosURL + 'recuperarUsuarioDoc', null, {params})
  }

  public actualizarUsuario(document: number, dto: ActualizarDatos): Observable<any>{
    const params = new HttpParams().set('doc', document)
    return this.httpClient.post<any>(this.actualizarDatosURL + 'actualizarUsuario', dto, {params})
  }
}
