import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { navbarEgresado } from 'src/environments/navBarEgresado';

@Component({
  selector: 'app-home-egresado',
  templateUrl: './home-egresado.component.html',
  styleUrls: ['./home-egresado.component.css']
})
export class HomeEgresadoComponent {

  navbarEgresado = navbarEgresado;
  selectedNavItem: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url.split('/')[2];
        this.selectedNavItem = navbarEgresado.find(item => item.routeLink === currentRoute);
      }
    });
  }

  updateSelectedNavItem(item: any) {
    this.selectedNavItem = item;
  }

}
