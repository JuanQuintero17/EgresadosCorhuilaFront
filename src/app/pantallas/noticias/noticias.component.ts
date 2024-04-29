import { Component } from '@angular/core';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent {

  newsList = [
    { title: 'Noticia N°1', active: true },
    {title : 'Noticia N°2', active: false},
    {title : 'Noticia N°3', active: true},
    {title : 'Noticia N°4', active: true},
    {title : 'Noticia N°5', active: true},
    {title : 'Noticia N°6', active: true}
  ];

  toggleNewsActive(index: number) {
    this.newsList[index].active = !this.newsList[index].active;
  }

}
