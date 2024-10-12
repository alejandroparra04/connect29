import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { Proyectos } from '../../../../models/proyecto.model';
import { Entregable, Deliverable } from '../../../../models/entegable.model';
import { Chart, registerables } from 'chart.js'
import { ReporteService } from '../../../../services/reporte.service';
import { ProyectoService } from '../../../../services/proyecto.service';

import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generar-reporte',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, SidebarComponent, NavbarComponent],
  templateUrl: './generar-reporte.component.html',
  styleUrl: './generar-reporte.component.scss'
})
export class GenerarReporteComponent implements OnInit {
  proyecto: Proyectos = {
    id: 0,
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    progreso: 0,
    responsable: '',
  };
  entregables: Deliverable[] = [];
  entregablesFiltrados: Deliverable[] = [];
  progreso: number = 0;

  fecha_inicio: Date | null = null;
  fecha_fin: Date | null = null;
  estado: string = '';

  selectedProyecto: number | null = null;
  selectedActividad: number | null = null;
  nombreActividad: string = '';
  proceso: string = '';

  chartTorta: any;
  chartBarras: any;

  menuCerrado = false;

  isDataLoaded: boolean = false;


  @ViewChild('graficaProgreso') graficaProgreso?: ElementRef<HTMLCanvasElement>;
  @ViewChild('graficaEntregables') graficaEntregables?: ElementRef<HTMLCanvasElement>;



  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly reporteService: ReporteService,
    private readonly proyectoService: ProyectoService
  ) {
    Chart.register(...registerables);
  }

  toggleMenu() {
    this.menuCerrado = !this.menuCerrado;
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.selectedProyecto = +params.get('idProyecto')!;  // Convierte el ID a number
      this.selectedActividad = +params.get('idActividad')!;
    });

    this.route.queryParams.subscribe(queryParams => {
      this.nombreActividad = queryParams['nombre'] || '';
      this.proceso = queryParams['proceso'] || '';
    });

    this.obtenerProyecto(this.selectedProyecto as number);
    this.obtenerEntregables(this.selectedProyecto as number, this.proceso);
  }

  ngAfterViewInit() {
    if (this.isDataLoaded) {
      this.actualizarGraficos();
    }
  }

  obtenerProyecto(proyectoId: number): void {
    this.proyectoService.obtenerProyectoPorId(proyectoId).subscribe({
      next: (proyecto: Proyectos) => {
        this.proyecto = proyecto;
      },
      error: (error) => {
        console.error('Error al obtener el proyecto:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener el proyecto',
          text: 'Comuniquese con el administrador.',
        });
      }
    });
  }

  obtenerEntregables(proyecto: number, proceso: string): void {
    this.reporteService.getReporte(proyecto, proceso).subscribe({
      next: (entregables: any[]) => {
        this.entregables = entregables;
        this.entregablesFiltrados = entregables;

        this.isDataLoaded = true; this.isDataLoaded = true;
        this.cdr.detectChanges();
        this.actualizarGraficos();
      },
      error: (error) => {
        console.error('Error al obtener entregables:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener los entregables',
          text: 'Hubo un problema al cargar los entregables.',
        });
      }
    });
  }


  volver(): void {
    this.router.navigate([`/entregables/${this.selectedProyecto}/${this.selectedActividad}`],
      { queryParams: { nombre: this.nombreActividad, proceso: this.proceso } }
    );
  }

  irABuscar() {
    this.router.navigate(['/buscar']);
  }

  Reporte(): void {
    this.entregablesFiltrados = this.filtrarPorEstado(this.entregables, this.estado);
    this.entregablesFiltrados = this.filtrarPorFechas(this.entregablesFiltrados, this.fecha_inicio, this.fecha_fin);

    setTimeout(() => {
      this.actualizarGraficos();
    });
  }

  actualizarGraficos(): void {
    if (this.chartTorta) {
      this.chartTorta.destroy();
    }
    if (this.chartBarras) {
      this.chartBarras.destroy();
    }

    if (this.graficaProgreso && this.graficaEntregables) {
      this.crearGraficoTorta();
      this.crearGraficoBarras();
    } else {
      console.warn('Los elementos del gráfico no están disponibles aún');
    }
  }

  crearGraficoTorta(): void {
    if (!this.graficaProgreso) {
      console.warn('El elemento graficaProgreso no está disponible');
      return;
    }

    const entregablesPendientes = this.entregablesFiltrados.filter(e => e.estado.toLowerCase() === 'pendiente').length;
    const entregablesEnProgreso = this.entregablesFiltrados.filter(e => e.estado.toLowerCase() === 'en_progreso').length;
    const entregablesCompletados = this.entregablesFiltrados.filter(e => e.estado.toLowerCase() === 'completado').length;

    console.log('Datos para gráfico de torta: ', {
      pendientes: entregablesPendientes,
      enProgreso: entregablesEnProgreso,
      completados: entregablesCompletados,
    });

    const totalEntregables = entregablesPendientes + entregablesEnProgreso + entregablesCompletados;

    if (totalEntregables === 0) {
      console.warn('No hay datos suficientes para mostrar el gráfico de torta');
      return;
    }

    this.chartTorta = new Chart(this.graficaProgreso.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Pendiente', 'En Progreso', 'Completado'],
        datasets: [
          {
            label: 'Estado de Entregables',
            data: [entregablesPendientes, entregablesEnProgreso, entregablesCompletados],
            backgroundColor: ['#ff6384', '#36a2eb', '#4caf50'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  crearGraficoBarras(): void {
    if (!this.graficaEntregables) {
      console.warn('El elemento graficaEntregables no está disponible');
      return;
    }

    const cantidadPendientes = this.entregablesFiltrados.filter(entregable => entregable.estado.toLowerCase() === 'pendiente').length;
    const cantidadEnProgreso = this.entregablesFiltrados.filter(entregable => entregable.estado.toLowerCase() === 'en_progreso').length;
    const cantidadCompletados = this.entregablesFiltrados.filter(entregable => entregable.estado.toLowerCase() === 'completado').length;

    this.chartBarras = new Chart(this.graficaEntregables.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Pendiente', 'En Progreso', 'Completado'],
        datasets: [
          {
            label: 'Cantidad de Entregables',
            data: [cantidadPendientes, cantidadEnProgreso, cantidadCompletados],
            backgroundColor: ['#ff6384', '#36a2eb', '#4caf50']
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cantidad de Entregables'
            }
          }
        }
      }
    });
  }


  filtrarPorEstado(entregables: Deliverable[], estado: string): Deliverable[] {
    if (!estado || estado.toLowerCase() === 'todos') {
      return entregables;
    }
    return entregables.filter(entregable => entregable.estado.toLowerCase() === estado.toLowerCase());
  }

  filtrarPorFechas(entregables: Deliverable[], fechaInicio: Date | null, fechaFin: Date | null): Deliverable[] {
    if (!fechaInicio && !fechaFin) {
      return entregables;
    }

    const inicioFiltrado = fechaInicio ? new Date(fechaInicio.setHours(0, 0, 0, 0)) : null;
    const finFiltrado = fechaFin ? new Date(fechaFin.setHours(23, 59, 59, 999)) : null;

    return entregables.filter(entregable => {
      const fechaCreacion = new Date(entregable.fecha_creacion);
      const cumpleFechaInicio = inicioFiltrado ? fechaCreacion >= inicioFiltrado : true;
      const cumpleFechaFin = finFiltrado ? fechaCreacion <= finFiltrado : true;
      return cumpleFechaInicio && cumpleFechaFin;
    });
  }

  // Avance() {
  //   this.router.navigate([`/generar-avance/${this.selectedProyecto}/${this.selectedActividad}`],
  //     { queryParams: { nombre: this.nombreActividad, proceso: this.proceso } });

  // }

  Avance() {
    this.router.navigate([`/certificado/${this.selectedProyecto}/${this.selectedActividad}`],
      { queryParams: { nombre: this.nombreActividad, proceso: this.proceso } });

  }

  calcularProgreso() {
    const entregablesCompletos = this.entregables.filter(e => e.estado === 'Completado').length;
    if (this.entregables.length > 0) {
      this.progreso = (entregablesCompletos / this.entregables.length) * 100;
    } else {
      this.progreso = 0;

    }
  }


  resetearFormulario() {
    this.fecha_inicio = null;
    this.fecha_fin = null;
    this.estado = '';

    this.entregablesFiltrados = [...this.entregables];

    this.actualizarGraficos();
  }

  descargar(): void {
    const data = document.getElementById('reporte'); // Asegúrate de que este ID existe en tu HTML
    if (data) {
      html2canvas(data).then((canvas) => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const heightLeft = imgHeight;
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('reporte.pdf');
      });
    }
  }


}
