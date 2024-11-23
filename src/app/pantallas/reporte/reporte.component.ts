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
  archivosSeleccionados: string = '';
  nameFile: string = '';
  selectAll = false;
  isModalOpen = false;
  asunto: string = '';
  descripcion: string = '';
  isDetailModalOpen: boolean = false;
  egresadoSeleccionado: Egresado | null = null;
  egresadoConsultado: any | null = null;
  alertMessage: string = ''; // Inicialmente vacío
  isVisible: boolean = false;
  icon: string = '';
  currentSlide: number = 0; // Slide inicial
  totalSlides: number = 3;  // Total de slides (cambia si añades más)
  searchTerm: string = ''; // Lo que el usuario escribe en el input
  filteredItems: any[] = []; // Lista filtrada de elementos
  

  constructor(
    private actualizarDatosService: ActualizarDatosService,
    private reporteService: ReporteService
  ){}

  ngOnInit(): void {
    this.listarEgresados()
    this.filteredItems = this.items;
  }

  listarEgresados() {
    this.actualizarDatosService.listarTodos().subscribe(
      response => {
        console.log(response);
        if (response.status === 'OK' && response.listObject?.length > 0) {
          this.items = response.listObject[0].map((egresado: any) => ({
            id: egresado.id || egresado.id,
            identificacion: egresado.noIdentificacion,
            name: `${egresado.primerNombre} ${egresado.segundoNombre || ''} ${egresado.primerApellido} ${egresado.segundoApellido || ''}`.trim(),
            img: 'ruta-a-imagen',
            timeAgo: '1 d',
            selected: false,
            email: egresado.emailInstitucional,
            sede: egresado.sedeUniversitaria || 'N/A',
            fechaIngreso: egresado.fechaIngreso ? new Date(egresado.fechaIngreso).toLocaleDateString() : 'N/A',
            fechaTerminacion: egresado.fechaGrado ? new Date(egresado.fechaGrado).toLocaleDateString() : 'N/A',
            facultad: egresado.facultad || 'N/A',
            programa: egresado.programa || 'N/A',
            
          }
          
          
        )
        
        );
        this.filteredItems = [...this.items]; 
        this.alertMessage = response.message;
        this.isVisible = true;
        this.icon = 'fas fa-check-circle';
        } else {
          console.error('Error al listar los egresados: Respuesta no válida o lista vacía.');
        }
      },
      error => {
        console.error('Error al listar los egresados:', error);
        this.alertMessage = 'Error a listar los egresados';
        this.isVisible = true;
        this.icon = 'fas fa-check-circle';
      }
    );
  }

  filterTable() {
    const searchTermLower = this.searchTerm.toLowerCase(); // Convertir el término a minúsculas para búsqueda insensible a mayúsculas
    this.filteredItems = this.items.filter((item) => {
      return (
        item.identificacion?.toString().toLowerCase().includes(searchTermLower) ||
        item.name?.toLowerCase().includes(searchTermLower) ||
        item.email?.toLowerCase().includes(searchTermLower) ||
        item.sede?.toLowerCase().includes(searchTermLower) ||
        item.facultad?.toLowerCase().includes(searchTermLower) ||
        item.programa?.toLowerCase().includes(searchTermLower)
      );
    });
  }
  

  abrirDetalle(egresado: Egresado) {
    this.egresadoSeleccionado = egresado
    this.isDetailModalOpen = true;
    console.log(egresado);
    this.actualizarDatosService.listarEgresadosId(egresado.id).subscribe(
      response => {
        console.log(response);
        this.egresadoConsultado = response;

      }
    )
  }
  
  cerrarDetalle() {
    this.egresadoSeleccionado = null;
    this.egresadoConsultado = null;
    this.isDetailModalOpen = false;
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
    if (archivos.length > 0) {
      const archivo = archivos[0];
      this.nameFile = archivo.name;
  
      if (archivo.type === 'application/pdf') {
        const reader = new FileReader();
  
        reader.onload = () => {
          const base64String = reader.result?.toString().split(',')[1];
          
          this.archivosSeleccionados = base64String || '';
        };
  
        reader.onerror = (error) => {
          console.error('Error al leer el archivo:', error);
        };
  
        reader.readAsDataURL(archivo);
      } else {
        console.error('El archivo seleccionado no es un PDF.');
      }
  
      console.log('Nombre del archivo seleccionado:', this.nameFile);
    } else {
      console.error('No se ha seleccionado ningún archivo.');
    }
  }

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
        this.alertMessage = data.message;
        this.isVisible = true;
        this.icon = 'fas fa-check-circle';
        
      },err => {
        this.alertMessage = 'Error al enviar el correo';
        this.isVisible = true;
        this.icon = 'fas fa-check-circle';
      }
    )

    this.closeModal();
  }

  descargarExcel() {
    const usuariosSeleccionados = this.getSelectedUsers();

    let ids: number[] | null = null;

    if (usuariosSeleccionados.length > 0) {
      ids = usuariosSeleccionados.map(user => user.id);
    }
    console.log(ids);
    

    this.reporteService.descargarExcel(ids).subscribe(
      response => {
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'ListaEgresados.xlsx';
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
        this.alertMessage = "Excel generado exitosamente";
        this.isVisible = true;
        this.icon = 'fas fa-check-circle';
      },
      error => {
        console.error('Error al descargar el archivo:', error);
      }
    );
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++;
    }
  }
  
  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

}
