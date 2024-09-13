import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Egresado } from 'src/app/model/egresado';
import { ActualizarDatosService } from 'src/app/services/actualizar-datos.service';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit{

  items: Egresado[] = [];
  archivosSeleccionados: string = ''; // Este contendrá la cadena base64
  nameFile: string = ''; // Aquí se guardará el nombre del archivo
  selectAll = false;
  isModalOpen = false;
  asunto: string = '';
  descripcion: string = '';
  

  constructor(
    private actualizarDatosService: ActualizarDatosService,
    private reporteService: ReporteService
  ){}

  ngOnInit(): void {
    this.listarEgresados()
  }

  listarEgresados() {
    this.actualizarDatosService.listarTodos().subscribe(
      response => {
        if (response.status === 'OK' && response.listObject?.length > 0) {
          this.items = response.listObject[0].map((egresado: any) => ({
            id: egresado.id || egresado.id,
            name: `${egresado.primerNombre} ${egresado.segundoNombre || ''} ${egresado.primerApellido} ${egresado.segundoApellido || ''}`.trim(),
            img: 'ruta-a-imagen', // Ajusta para usar la imagen real si es necesario
            timeAgo: '1 d', // Puedes ajustar esto si tienes la lógica real para calcularlo
            selected: false,
            email: egresado.emailInstitucional,
            sede: egresado.sedeUniversitaria || 'N/A',
            fechaIngreso: egresado.fechaIngreso ? new Date(egresado.fechaIngreso).toLocaleDateString() : 'N/A',
            fechaTerminacion: egresado.fechaGrado ? new Date(egresado.fechaGrado).toLocaleDateString() : 'N/A',
            facultad: egresado.facultad || 'N/A',
            programa: egresado.programa || 'N/A',
          }));
        } else {
          console.error('Error al listar los egresados: Respuesta no válida o lista vacía.');
        }
      },
      error => {
        console.error('Error al listar los egresados:', error);
      }
    );
  }

 

  

  toggleSelectAll() {
    this.items.forEach(item => item.selected = this.selectAll);
  }

  checkSelection() {
    this.selectAll = this.items.every(item => item.selected);
  }

  openModal() {
    if (this.getSelectedUsers().length === 0) {
      console.error('No hay usuarios seleccionados.');
      return;
    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onFileSelected(event: any) {
    const archivos = Array.from(event.target.files) as File[];  
    // Asegurarse de que haya al menos un archivo seleccionado
    if (archivos.length > 0) {
      const archivo = archivos[0]; // Suponiendo que solo seleccionas un archivo
      this.nameFile = archivo.name; // Guardar el nombre del archivo
  
      // Verificar si es un archivo PDF
      if (archivo.type === 'application/pdf') {
        const reader = new FileReader();
  
        reader.onload = () => {
          const base64String = reader.result?.toString().split(',')[1]; // Obtener solo la parte base64
          console.log('Archivo en Base64:', base64String);
          
          // Guardar el archivo convertido en base64 en archivosSeleccionados (si es necesario)
          this.archivosSeleccionados = base64String || '';
        };
  
        reader.onerror = (error) => {
          console.error('Error al leer el archivo:', error);
        };
  
        // Leer el archivo como base64
        reader.readAsDataURL(archivo);
      } else {
        console.error('El archivo seleccionado no es un PDF.');
      }
  
      console.log('Nombre del archivo seleccionado:', this.nameFile);
    } else {
      console.error('No se ha seleccionado ningún archivo.');
    }
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
      subject: this.asunto,
      text: this.descripcion,
      file: this.archivosSeleccionados,
      emails: correosUsuarios,
      nameFile: this.nameFile
    };

    this.reporteService.enviarCorreos(correo).subscribe(
      data => {
        console.log("Correos enviados");
        console.log(data);
        
      }
    )

    console.log('Enviando correo a los siguientes destinatarios:', correosUsuarios);
    console.log('Datos del correo:', correo);

    this.closeModal();
  }

  descargarExcel() {
    const usuariosSeleccionados = this.getSelectedUsers(); // Usamos la lógica de selección que ya tienes

    let ids: number[] | null = null; // Creamos un array de IDs, inicialmente null

    if (usuariosSeleccionados.length > 0) {
      ids = usuariosSeleccionados.map(user => user.id); // Si hay usuarios seleccionados, llenamos los IDs
    }
    console.log(ids);
    

    // Llamamos al servicio para descargar el archivo
    this.reporteService.descargarExcel(ids).subscribe(
      response => {
        // Crear un enlace para descargar el archivo CSV
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'ListaEgresados.xlsx';
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
      },
      error => {
        console.error('Error al descargar el archivo:', error);
      }
    );
  }

}
