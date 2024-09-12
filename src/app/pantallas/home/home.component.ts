import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { navbarData } from 'src/environments/navBar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  navbarData = navbarData;
  selectedNavItem: any;

  constructor(
    private router: Router,
    private tokenService: TokenService

  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url.split('/')[2];
        this.selectedNavItem = navbarData.find(item => item.routeLink === currentRoute);
      }
    });
  }

  updateSelectedNavItem(item: any) {
    this.selectedNavItem = item;
  }

  logout(){
    console.log("SALIR");
    
    this.tokenService.logOut();
    this.router.navigate(['/admin']);
  }
}
