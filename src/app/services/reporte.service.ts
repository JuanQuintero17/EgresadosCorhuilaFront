import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  noticiasURL = environment.apiResURL + '/egresados/';


  constructor(private httpClient: HttpClient) { }

  public enviarCorreos(dto: any): Observable<any> {
    return this.httpClient.post<any>(this.noticiasURL + 'sendMail', dto)
  }

  public descargarExcel(ids: number[] | null): Observable<Blob> {
    return this.httpClient.post(this.noticiasURL + 'export', ids, { responseType: 'blob' });
  }
}
