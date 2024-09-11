import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from 'src/app/services/dashboard.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  egresadosNeiva: number = 0
  egresadosPitalito: number = 0
  ultimosEgresadosList: string[] = [];
  
  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  constructor(
    private dashboardService: DashboardService
  ){}

  ngOnInit(): void {
    this.totalEstudiantesSede()
    this.totalEstudiantesAño()
    this.ultimosEgresados()
  }

  ultimosEgresados() {
    this.dashboardService.ultimosEgresados().subscribe(
      data => {
        if (data.codResponse === 200) {
          this.ultimosEgresadosList = data.listObject as string[];
        } else {
          console.error('Error al obtener los últimos egresados:', data.message);
        }
      },
      error => {
        console.error('Error al llamar el servicio de últimos egresados:', error);
      }
    );
  }

  totalEstudiantesSede(){

    this.dashboardService.listEgresadosSede("Neiva").subscribe(
      data => {
        console.log(data);
        this.egresadosNeiva = data.object
      }
    );

    this.dashboardService.listEgresadosSede("Pitalito").subscribe(
      data => {
        console.log(data);
        this.egresadosPitalito = data.object
      }
    );

  }

  totalEstudiantesAño() {
    this.dashboardService.listEgresadosAño().subscribe(
      data => {
        if (data.codResponse === 200) {
          const egresadosPorAño = data.listObject[0]; 
          const años = Object.keys(egresadosPorAño);
          const totales = Object.values(egresadosPorAño).map(value => Number(value));
  
          this.updateChart(años, totales);
        } else {
          console.error('No se pudieron obtener los egresados por año');
        }
      },
      error => {
        console.error('Error al obtener egresados por año:', error);
      }
    );
  }

  updateChart(labels: string[], data: number[]) {
    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = data;
    this.chart.update();
  }

  ngAfterViewInit() {
    this.chart = new Chart(this.myChart.nativeElement, {
      type: 'line',
      data: {
        labels: [], 
        datasets: [{
          label: 'Egresados por período',
          data: [],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
