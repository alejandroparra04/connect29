import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { Chart, registerables } from 'chart.js';



@Component({
  selector: 'app-generar-avance',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './generar-avance.component.html',
  styleUrl: './generar-avance.component.scss'
})
export class GenerarAvanceComponent implements OnInit {

  @ViewChild('barChart') barChartRef!: ElementRef;
  @ViewChild('pieChart') pieChartRef!: ElementRef;

  public progreso: number = 65;

  selectedProyecto: number | null = null;
  selectedActividad: number | null = null;
  nombreActividad: string = '';
  proceso: string = '';

  constructor(private readonly router: Router, private readonly route: ActivatedRoute,) { }

  ngOnInit(): void {
    Chart.register(...registerables);

    this.route.paramMap.subscribe(params => {
      this.selectedProyecto = +params.get('idProyecto')!;  // Convierte el ID a number
      this.selectedActividad = +params.get('idActividad')!;
    });

    this.route.queryParams.subscribe(queryParams => {
      this.nombreActividad = queryParams['nombre'] || '';
      this.proceso = queryParams['proceso'] || '';
    });

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

  home() {
    this.router.navigate(['/home']);
  }

  volver(): void {
    this.router.navigate([`/generar-reporte/${this.selectedProyecto}/${this.selectedActividad}`],
      { queryParams: { nombre: this.nombreActividad, proceso: this.proceso } }
    );
  }

  irABuscar() {
    this.router.navigate(['/buscar']);
  }


}
