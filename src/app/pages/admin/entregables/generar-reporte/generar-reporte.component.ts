import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Proyectos } from '../../../../models/proyecto.model'; 
import { Entregable } from '../../../../models/entegable.model';
import { Chart, registerables } from 'chart.js'
import { ReporteService } from '../../../../services/reporte.service';

@Component({
  selector: 'app-generar-reporte',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './generar-reporte.component.html',
  styleUrl: './generar-reporte.component.scss'
})
export class GenerarReporteComponent implements OnInit {
  proyecto: Proyectos [] = [];
  entregables: Entregable [] = [];
  progreso: number = 0;
  fecha_inicio: Date = new Date();
  fecha_fin: Date = new Date();
  estado:  string = '';

  menuCerrado = false;

  @ViewChild('graficaProgreso', { static: true }) graficaProgreso!: ElementRef<HTMLCanvasElement>;
  @ViewChild('graficaEntregables', { static: true }) graficaEntregables!: ElementRef<HTMLCanvasElement>;


  constructor (private router: Router, private reporteService: ReporteService){
    Chart.register(...registerables);
  }
  
  toggleMenu(){
    this.menuCerrado = !this.menuCerrado;
  }

  ngOnInit() {}

  volver(){
    this.router.navigate(['/entregables']);
  }

  irABuscar(){
    this.router.navigate(['/buscar']);
  }

  Reporte(){
    this.reporteService.getReporte(this.fecha_inicio, this.fecha_fin, this.estado)
      .subscribe(({ entregables, proyectos }) => {
        this.entregables = entregables;
        this.proyecto = proyectos;
      }, error => {
        console.error('Error generando reporte:', error);
      });
    
  }

  Avance(){
    this.router.navigate(['/generar-avance']);
  }

  calcularProgreso(){
    const entregablesCompletos = this.entregables.filter(e => e.estado === 'Completado').length;
    if (this.entregables.length > 0){
      this.progreso = (entregablesCompletos / this.entregables.length) * 100;
    } else {
      this.progreso  = 0;

    }
  }

  crearGraficoTorta() {
    const entregablesPendientes = this.entregables.filter(e => e.estado === 'pendiente').length;
    const entregablesEnProgreso = this.entregables.filter(e => e.estado === 'en_progreso').length;
    const entregablesCompletados = this.entregables.filter(e => e.estado === 'completado').length;

    new Chart(this.graficaProgreso.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Pendiente', 'En Progreso', 'Completado'],
        datasets: [
          {
            label: 'Estado de Entregables',
            data: [entregablesPendientes, entregablesEnProgreso, entregablesCompletados],
            backgroundColor: ['#ff6384', '#36a2eb', '#4caf50']
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }

  // Crear gráfico de barras para mostrar la cantidad de entregables por estado
  crearGraficoBarras() {
    new Chart(this.graficaEntregables.nativeElement, {
      type: 'bar',
      data: {
        labels: this.entregables.map(entregable => entregable.nombre),
        datasets: [
          {
            label: 'Entregables',
            data: this.entregables.map(entregable => 
              entregable.estado === 'completado' ? 100 : entregable.estado === 'en_progreso' ? 50 : 0),
            backgroundColor: ['#36a2eb']
          }
        ]
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


  resetearFormulario() { 
    this.fecha_inicio = new Date();
    this.fecha_fin = new Date();
    this.estado = '';
    this.entregables = [];
    this.proyecto  = [];
  }

  descargar(){
    this.router.navigate(['/emision-certificado'])
  }
}
