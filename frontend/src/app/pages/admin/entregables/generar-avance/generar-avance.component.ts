import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';



@Component({
  selector: 'app-generar-avance',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './generar-avance.component.html',
  styleUrl: './generar-avance.component.scss'
})
export class GenerarAvanceComponent implements OnInit{

  @ViewChild('barChart') barChartRef!: ElementRef;  
  @ViewChild('pieChart') pieChartRef!: ElementRef;

  public progreso: number = 65;
  
  constructor (private router: Router) { }

  ngOnInit(): void {
    Chart.register(...registerables);  
    this.createBarChart();
    this.createPieChart();
  }

  createBarChart() {
    const ctx = this.barChartRef.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Fecha 1', 'Fecha 2', 'Fecha 3'],
        datasets: [{
          label: 'Entregables',
          data: [5, 10, 15],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createPieChart() {
    const ctx = this.pieChartRef.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Aprobado', 'Revisado', 'Pendiente'],
        datasets: [{
          data: [30, 20, 50],
          backgroundColor: ['green', 'blue', 'red']
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  home(){
    this.router.navigate(['/home']);
  }

  volver(){
    this.router.navigate(['/generar-reporte']);
  }

  irABuscar(){
    this.router.navigate(['/buscar']);
  }


}
