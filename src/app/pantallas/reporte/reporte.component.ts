import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent {

  items = [
    { name: 'Luis Angel Vargas', img: 'ruta-a-imagen', timeAgo: '5 m', selected: false, email: 'luis@correo.com' },
    { name: 'Luis Angel Vargas', img: 'ruta-a-imagen', timeAgo: '20 m', selected: false, email: 'luis20@correo.com' },
    { name: 'You got this', img: 'ruta-a-imagen', timeAgo: '2 h', selected: false, email: 'yougotthis@correo.com' },
    { name: 'Live your purpose', img: 'ruta-a-imagen', timeAgo: '10 h', selected: false, email: 'live@correo.com' },
    { name: 'Kindness', img: 'ruta-a-imagen', timeAgo: '18 h', selected: false, email: 'kindness@correo.com' },
    { name: 'Beautiful', img: 'ruta-a-imagen', timeAgo: '1 d', selected: false, email: 'beautiful@correo.com' }
  ];

  selectAll = false;
  isModalOpen = false;
  archivosSeleccionados: File[] = [];
  asunto: string = '';
  descripcion: string = '';

  toggleSelectAll() {
    this.items.forEach(item => item.selected = this.selectAll);
  }

  checkSelection() {
    this.selectAll = this.items.every(item => item.selected);
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onFileSelected(event: any) {
    this.archivosSeleccionados = Array.from(event.target.files);
    console.log('Archivos seleccionados:', this.archivosSeleccionados);
  }

  // LOGICA PARA ENVIAR CORREO A USUARIOS SELECCIONADOS!!!!!!!!!!!!!!!!!!!!!!!!!
  getSelectedUsers() {
    return this.items.filter(item => item.selected);
  }

  enviarCorreo() {
    const usuariosSeleccionados = this.getSelectedUsers();

    if (usuariosSeleccionados.length === 0) {
      console.error('No hay usuarios seleccionados para enviar el correo.');
      return;
    }

    const correosUsuarios = usuariosSeleccionados.map(usuario => usuario.email);

    const correo = {
      asunto: this.asunto,
      descripcion: this.descripcion,
      archivos: this.archivosSeleccionados,
      destinatarios: correosUsuarios
    };

    console.log('Enviando correo a los siguientes destinatarios:', correosUsuarios);
    console.log('Datos del correo:', correo);

    this.closeModal();
  }

}
