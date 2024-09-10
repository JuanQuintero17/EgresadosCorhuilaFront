import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noticias-egresado-info',
  templateUrl: './noticias-egresado-info.component.html',
  styleUrls: ['./noticias-egresado-info.component.css']
})
export class NoticiasEgresadoInfoComponent {

  @Input() noticia: any;
  @Output() close = new EventEmitter<void>();

  constructor(private router : Router){}


  handleCloseClick() {
    this.close.emit();
  }

}
