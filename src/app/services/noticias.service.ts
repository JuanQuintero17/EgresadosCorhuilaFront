import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Noticias } from '../model/noticias';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  noticiasURL = environment.apiResURL + '/egresados/';

  constructor(private httpClient: HttpClient) { }

  public listNoticias(): Observable<any> {
    return this.httpClient.get<any>(this.noticiasURL + 'listNewsCurrent')
  }

  public guardarNoticias(dto: Noticias): Observable<any> {
    return this.httpClient.post<any>(this.noticiasURL + 'saveNews', dto)
  }

  public actualizarNoticias(id: number,dto: Noticias): Observable<any> {
    const params = new HttpParams().set('id', id)
    return this.httpClient.put<any>(this.noticiasURL + 'updateNews', dto, {params})
  }

  public actualizarEstado(id: number, status: boolean): Observable<any> {
    const params = new HttpParams()
    .set('id', id.toString())
    .set('status', status.toString());
  return this.httpClient.put<any>(this.noticiasURL + 'updateStatus', null, {params})
  }

  public listNoticiasTotales(): Observable<any> {
    return this.httpClient.get<any>(this.noticiasURL + 'listNews')
  }
}
