import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class HomeEgresadoGuard implements CanActivate {

  realRol!: string;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean  {
    const expectedRoles = route.data['expectedRoles'];
    this.realRol = this.tokenService.isAdmin() ? 'admin' : 'egresado'
    if(!this.tokenService.isLogged() || expectedRoles.indexOf(this.realRol) < 0) {
      this.router.navigate(['/login'])
      return false;
    }
    return true;
  }
  
}
