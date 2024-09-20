import { Component, OnInit } from '@angular/core';
import { Noticias } from 'src/app/model/noticias';
import { NoticiasService } from 'src/app/services/noticias.service';
import imageCompression from 'browser-image-compression';


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit{

  alertMessage: string = ''; // Inicialmente vacío
  isVisible: boolean = false;
  icon: string = '';

  ngOnInit(): void {
    this.listarNoticias();
  }

  constructor(
    private noticiasService: NoticiasService
  ){}

  noticiasData = {
    id: null,
    title:'',
    content: '',
    file: null as number[] | null,
    state: true,
    expirationDate:''
  }

  noticias: any[] = [];

  listarNoticias(){
    this.noticiasService.listNoticiasTotales().subscribe(
      response => {
        console.log(response);
        this.alertMessage = response.message;
        this.isVisible = true;
        this.icon = 'fas fa-check-circle';
        if (response && response.listObject && Array.isArray(response.listObject) && response.listObject.length > 0) {
          this.noticias = response.listObject[0]; // Asignamos el primer array de listObject a noticias
        } else {
          console.error('Error: Estructura de datos no esperada', response);
        }
      }
    )
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Configura las opciones de compresión
      const options = {
        maxSizeMB: 1, // Tamaño máximo del archivo en MB
        maxWidthOrHeight: 1920, // Máxima anchura o altura
        useWebWorker: true // Usar Web Worker para compresión en segundo plano
      };

      try {
       
        const compressedFile = await imageCompression(file, options);
        
        
        const reader = new FileReader();
        reader.onload = () => {
          const byteArray = new Uint8Array(reader.result as ArrayBuffer);
          this.noticiasData.file = Array.from(byteArray); 
        };
        reader.readAsArrayBuffer(compressedFile);
      } catch (error) {
        console.error('Error al comprimir la imagen:', error);
      }
    }
  }

  Public() {
    let expirationDate: Date = new Date(this.noticiasData.expirationDate);
    const dtoNoticia = new Noticias(
      this.noticiasData.title,
      this.noticiasData.content,
      this.noticiasData.file,
      this.noticiasData.state,
      expirationDate
    );

    if (this.noticiasData.id) {
      this.noticiasService.actualizarNoticias(this.noticiasData.id, dtoNoticia).subscribe(
        data => {
          if (data.codResponse === 200) {
            console.log("Noticia actualizada exitosamente");
            this.resetForm();
            this.listarNoticias(); 
          }
        },
        error => {
          console.error('Error al actualizar la noticia:', error);
        }
      );
    } else {
      this.noticiasService.guardarNoticias(dtoNoticia).subscribe(
        data => {
          if (data.codResponse === 200) {
            console.log("Noticia creada exitosamente");
            this.resetForm();
            this.listarNoticias(); 
          }
        },
        error => {
          console.error('Error al crear la noticia:', error);
        }
      );
    }
  }

  resetForm() {
    this.noticiasData = {
      id: null,
      title: '',
      content: '',
      file: null,
      state: true,
      expirationDate: ''
    };
  }
  

  cargarNoticia(noticia: any) {
    const formattedDate = noticia.expirationDate.split('T')[0];
    this.noticiasData = {
      id: noticia.id,
      title: noticia.title,
      content: noticia.content,
      file: noticia.file || null,
      state: noticia.status,
      expirationDate: formattedDate
    };
    console.log(noticia);
    
  }

  onStatusChange(noticia: any, event: Event) {
    const input = event.target as HTMLInputElement;
    const newStatus = input.checked;
    this.noticiasService.actualizarEstado(noticia.id, newStatus).subscribe(
      data => {
        this.resetForm();
        console.log("Estado actualizado exitosamente");
        console.log(data);
        noticia.status = newStatus;
      },err => {
        console.error("Error al actualizar: ", err)
      }
    )
  }


}
