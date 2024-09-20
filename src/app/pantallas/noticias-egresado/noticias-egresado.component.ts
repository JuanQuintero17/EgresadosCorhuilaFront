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
  selectedNoticia: any;
  alertMessage: string = ''; // Inicialmente vacío
  isVisible: boolean = false;
  icon: string = '';

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
        this.alertMessage = data.message;
        this.isVisible = true;
        this.icon = 'fas fa-check-circle';
        if (data.codResponse === 200) {
          this.isNoticias = true;
  
          if (Array.isArray(data.listObject) && data.listObject.length > 0) {
            this.noticias = data.listObject[0].map((noticia: { title: any; content: any; file: number[]; }) => {
              // Convertir el array de bytes a una URL de datos
              const imagenUrl = noticia.file.length ? this.arrayBufferToBase64(noticia.file) : "../../../assets/img/default.jpg";
  
              return {
                titulo: noticia.title,
                contenido: noticia.content,
                imagen: imagenUrl
              };
            });
          }
        }
        
      },
      error => {
        console.error("Error al listar noticias:", error);
      }
    );
  }

  private arrayBufferToBase64(buffer: number[]): string {
    const byteArray = new Uint8Array(buffer);
    const binary = byteArray.reduce((data, byte) => data + String.fromCharCode(byte), '');
    const base64 = window.btoa(binary);
    return `data:image/jpeg;base64,${base64}`; // Ajusta el tipo MIME según el tipo de imagen
  }

  openModal(noticia: any){
    this.selectedNoticia = noticia;
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
  }

}
