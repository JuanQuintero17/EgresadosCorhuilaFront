import { HttpClient } from '@angular/common/http';
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
    return this.httpClient.get<any>(this.noticiasURL + 'listNews')
  }
}
