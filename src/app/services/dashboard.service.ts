
import { HttpClient, HttpParams } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario, UsuarioResponse } from '../domain/listar';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  noticiasURL = environment.apiResURL + '/egresados/';



  constructor(protected httpClient: HttpClient) { }
  
  public listEgresadosSede(sede: string): Observable<any> {
    const params = new HttpParams().set('sede', sede)
    return this.httpClient.get<any>(this.noticiasURL + 'totalEgresadosSede', { params })
  }

  public listEgresadosAño(): Observable<any> {
    return this.httpClient.get<any>(this.noticiasURL + 'totalEgresadosAño')
  }

  public ultimosEgresados(): Observable<any> {
    return this.httpClient.get<any>(this.noticiasURL + 'ultimosEgresados')
  }
  
}
