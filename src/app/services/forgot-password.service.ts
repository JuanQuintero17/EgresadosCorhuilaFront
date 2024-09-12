import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  authURL = environment.apiResURL + '/auth/';


  constructor(private httpClient: HttpClient) { }

  public forgotPassword(document: number): Observable<any>{
    const params = new HttpParams().set('doc', document)
    return this.httpClient.post<any>(this.authURL + 'olvidoContraseña', null,{params})
  }
}
