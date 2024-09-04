import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-noticias-egresado',
  templateUrl: './noticias-egresado.component.html',
  styleUrls: ['./noticias-egresado.component.css']
})
export class NoticiasEgresadoComponent implements OnInit{

  isModalOpen: boolean = false;
  isNoticias: boolean = false;

  constructor(
    private noticiasService: NoticiasService,
    private router : Router
  ){}

  noticias = [
    {
      titulo: "",
      contenido: "",
      imagen: ""
    },
    
  ];

  ngOnInit(): void {
    this.listarNoticias()
  }

  listarNoticias() {
    this.noticiasService.listNoticias().subscribe(
      data => {
        console.log(data);
        if(data.codResponse == 200){
          this.isNoticias = true;
          
          if(Array.isArray(data.listObject) && data.listObject.length > 0){
            this.noticias = data.listObject[0].map((noticia: { title: any; content: any; }) => ({
              titulo: noticia.title,
              contenido: noticia.content,
              imagen: "../../../assets/img/admin.jpg"
            }));
          }
        }
      },error => {
        console.error("Error al listas noticias")
      }
    )
  }

  openModal(){
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
  }

}
