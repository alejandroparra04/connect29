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
  nombreResponsable: string = '';
  correoElectronico: string = '';
  entidadCertificadora: string = '';

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
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    });

    // Margen general para los elementos
    const leftMargin = 60;
    const lineSpacing = 20;
    let currentY = 80; // Margen superior inicial

    // Logo en la parte superior izquierda
    const logoImg = 'assets/img/imagen_logo.jpg'; // Ruta a la imagen del logo
    const logoWidth = 100;
    const logoHeight = 50;
    doc.addImage(logoImg, 'JPEG', leftMargin, currentY, logoWidth, logoHeight);

    // Espaciado entre el logo y el título
    currentY += logoHeight + 30;

    // Centrado del título
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Certificado de Conformidad', doc.internal.pageSize.getWidth() / 2, currentY, { align: 'center' });

    // Subtítulo
    currentY += 30;
    doc.setFontSize(16);
    doc.text('de la Norma ISO 29110-5', doc.internal.pageSize.getWidth() / 2, currentY, { align: 'center' });

    // Espaciado adicional antes de la información de la empresa
    currentY += 40;

    // Información de la empresa
    doc.setFontSize(12);
    const infoText = [
      { label: 'Nombre de la Empresa:', value: this.nombreEmpresa || '________________' },
      { label: 'Fecha de Emisión:', value: this.fechaInicio || '________________' },
      { label: 'Válido Hasta:', value: this.fechaFin || '________________' },
      { label: 'Nombre del Responsable:', value: this.nombreResponsable || '________________' },
      { label: 'Correo Electrónico:', value: this.correoElectronico || '________________' },
      { label: 'Entidad Certificadora:', value: this.entidadCertificadora || '________________' },
    ];

    infoText.forEach(item => {
      doc.text(`${item.label}`, leftMargin, currentY);
      doc.text(`${item.value}`, leftMargin + 150, currentY); // Ajusta el espacio entre label y valor
      currentY += lineSpacing;
    });

    // Espacio adicional antes de la sección de descripción
    currentY += 20;
    doc.setFontSize(14);
    doc.text('Descripción de la norma:', leftMargin, currentY);

    currentY += 15;
    doc.setFontSize(12);
    doc.text(
      'La norma ISO 29110-5 proporciona un marco estructurado para la gestión de proyectos en pequeñas ' +
      'organizaciones, enfocándose en la mejora continua y la satisfacción del cliente a través de procesos ' +
      'estandarizados y eficientes.',
      leftMargin,
      currentY,
      { maxWidth: 300, align: 'justify' }
    );

    currentY += 50;
    doc.setFontSize(14);
    doc.text('Alcance de la certificación:', leftMargin, currentY);

    currentY += 15;
    doc.setFontSize(12);
    doc.text(
      'La certificación confirma que la entidad ha cumplido con todos los procesos requeridos por la norma, ' +
      'asegurando un enfoque sistemático en la gestión de proyectos y la calidad en la entrega de productos y servicios.',
      leftMargin,
      currentY,
      { maxWidth: 300, align: 'justify' }
    );

    // Espacio adicional antes de la sección de firmas
    currentY += 50;
    doc.text('Certificante: ____________________', leftMargin, currentY);
    currentY += lineSpacing;
    doc.text('Firma de quien certifica: ____________________', leftMargin, currentY);

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


// descargarCertificado() {
//   const doc = new jsPDF();

//   // Centrado del título
//   doc.setFontSize(18);
//   doc.setFont('helvetica', 'bold');
//   const titulo = 'Certificado de Cumplimiento';
//   const textWidth = doc.getTextWidth(titulo);
//   const pageWidth = doc.internal.pageSize.getWidth();
//   const xPos = (pageWidth - textWidth) / 2;
//   doc.text(titulo, xPos, 30);

//   // Información general
//   doc.setFontSize(12);
//   doc.setFont('helvetica', 'normal');
//   doc.text(`Por medio de este formato se demuestra que la empresa ${this.nombreEmpresa},`, 20, 50);
//   doc.text(`a cargo del proyecto ${this.nombreProyecto}, se le certifica por el`, 20, 60);
//   doc.text('cumplimiento de todos los entregables requeridos por la norma ISO/IEC 29110-5.', 20, 70);
//   doc.text(`Fechas del proyecto: Desde el ${this.fechaInicio} hasta ${this.fechaFin}.`, 20, 80);

//   // Espacio para firmas
//   doc.text(`Certificante: ____________________`, 20, 100);
//   doc.text(`Firma de quien certifica: ____________________`, 20, 110);

//   // Guardar el PDF
//   doc.save('certificado.pdf');
// }
