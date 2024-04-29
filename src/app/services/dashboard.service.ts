
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario, UsuarioResponse } from '../domain/listar';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  protected baseUrlApi: string;
  protected baseUrlAuth: string;
  protected  urlImage: string;

  constructor(protected http: HttpClient) {
    this.baseUrlApi = environment.urlApi;
    this.baseUrlAuth = environment.urlauth;
    this.urlImage = environment.urlImage;
  }
  
  /**
   * Metodo para listar los usuarios en el deshboard
   * @returns Observable<ListaUsuarios>
   */
  public listarUsuarios(): Observable<any> {
    const url = this.baseUrlApi + '/egresados/listar';
    return this.http.get(url);
  }
  
}
