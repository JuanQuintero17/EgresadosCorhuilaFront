import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noticias-egresado-info',
  templateUrl: './noticias-egresado-info.component.html',
  styleUrls: ['./noticias-egresado-info.component.css']
})
export class NoticiasEgresadoInfoComponent {

  @Output() close = new EventEmitter<void>();

  constructor(private router : Router){}

  noticias = [
    {
      titulo: "Noticia 1: Título H2",
      contenido: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a ex in risus volutpat finibus at tristique lacus.",
      imagen: "../../../assets/img/admin.jpg"
    },
    
  ];

  handleCloseClick() {
    this.close.emit();
  }

}
