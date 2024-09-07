import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginUserDto } from '../model/login-user-dto';
import { Observable } from 'rxjs';
import { JwtTokenDto } from '../model/jwt-token-dto';
import { CreateUserDto } from '../model/create-user-dto';
import { PreRegistro } from '../model/pre-registro';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.apiResURL + '/auth/';

  constructor(private httpClient: HttpClient) { }

  public login(dto: LoginUserDto): Observable<JwtTokenDto> {
    return this.httpClient.post<JwtTokenDto>(this.authURL + 'login', dto)
  }

  public register(dto: CreateUserDto): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'create', dto)
  }

  public preRegister(dto: PreRegistro): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'preRegistro', dto)
  }
}
