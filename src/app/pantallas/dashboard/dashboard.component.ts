import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  constructor(){}

  ngAfterViewInit() {
    this.chart = new Chart(this.myChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
        datasets: [{
          label: 'Egresados por período',
          data: [20, 50, 25, 75, 55, 65, 85],
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
