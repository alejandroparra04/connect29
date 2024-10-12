import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { jsPDF } from 'jspdf';

import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-certificado',
  standalone: true,
  imports: [FormsModule, RouterLink, SidebarComponent, NavbarComponent],
  templateUrl: './certificado.component.html',
  styleUrl: './certificado.component.scss'
})
export class CertificadoComponent {

  nombreEmpresa: string = '';
  nombreProyecto: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';

  selectedProyecto: number | null = null;
  selectedActividad: number | null = null;
  nombreActividad: string = '';
  proceso: string = '';

  menuCerrado = false;

  constructor(private readonly router: Router, private readonly route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedProyecto = +params.get('idProyecto')!;  // Convierte el ID a number
      this.selectedActividad = +params.get('idActividad')!;
    });

    this.route.queryParams.subscribe(queryParams => {
      this.nombreActividad = queryParams['nombre'] || '';
      this.proceso = queryParams['proceso'] || '';
    });
  }

  toggleMenu() {
    this.menuCerrado = !this.menuCerrado;
  }

  descargarCertificado() {
    const doc = new jsPDF();

    // Centrado del título
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    const titulo = 'Certificado de Cumplimiento';
    const textWidth = doc.getTextWidth(titulo);
    const pageWidth = doc.internal.pageSize.getWidth();
    const xPos = (pageWidth - textWidth) / 2;
    doc.text(titulo, xPos, 30);

    // Información general
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Por medio de este formato se demuestra que la empresa ${this.nombreEmpresa},`, 20, 50);
    doc.text(`a cargo del proyecto ${this.nombreProyecto}, se le certifica por el`, 20, 60);
    doc.text('cumplimiento de todos los entregables requeridos por la norma ISO/IEC 29110-5.', 20, 70);
    doc.text(`Fechas del proyecto: Desde el ${this.fechaInicio} hasta ${this.fechaFin}.`, 20, 80);

    // Espacio para firmas
    doc.text(`Certificante: ____________________`, 20, 100);
    doc.text(`Firma de quien certifica: ____________________`, 20, 110);

    // Guardar el PDF
    doc.save('certificado.pdf');
  }


  home() {
    this.router.navigate(['/home']);
  }

  // volver() {
  //   this.router.navigate(['/emision-certificado']);
  // }

  volver(): void {
    this.router.navigate([`/generar-reporte/${this.selectedProyecto}/${this.selectedActividad}`],
      { queryParams: { nombre: this.nombreActividad, proceso: this.proceso } }
    );
  }

  irABuscar() {
    this.router.navigate(['/buscar']);
  }

}
