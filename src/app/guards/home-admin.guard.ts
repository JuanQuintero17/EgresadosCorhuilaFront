import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class HomeAdminGuard implements CanActivate {

  realRol!: string;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean  {
    const expectedRoles = route.data['expectedRoles'];
    this.realRol = this.tokenService.isAdmin() ? 'admin' : 'egresado'
    if(!this.tokenService.isLogged() || expectedRoles.indexOf(this.realRol) < 0) {
      this.router.navigate(['/admin'])
      return false;
    }
    return true;
  }
  
}
