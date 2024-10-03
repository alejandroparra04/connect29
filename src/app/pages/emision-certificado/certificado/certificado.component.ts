import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-certificado',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './certificado.component.html',
  styleUrl: './certificado.component.scss'
})
export class CertificadoComponent {

  nombreEmpresa: string= '';
  nombreProyecto: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';

  menuCerrado = false;

  constructor (private router: Router){}

  toggleMenu(){
    this.menuCerrado = !this.menuCerrado;
  }
  
  descargarCertificado(){
    const doc = new jsPDF();

    // const logo =  new Image();
    // doc.addImage(logo,  'PNG', 15, 15, 20, 20);

    doc.setFontSize(16);
    doc.setFont('arial', 'bold')
    const tittle = 'Certificado de cumplimiento';
    const titleWidth = doc.getTextWidth(tittle);
    const x = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
    doc.text(tittle, x, 40);

    doc.setFontSize(12);
    doc.setFont('arial', 'normal');
    doc.text(`Por medio de este formato se demuestra que la empresa ${this.nombreEmpresa},`, 10, 60);
    doc.text(`a cargo del proyecto ${this.nombreProyecto}, se le certifica por el`, 10, 70);
    doc.text('cumplimiento de todos los entregables requeridos por la norma ISO/IEC 29110-5.', 10, 80);
    doc.text(`Fechas del proyecto: Desde el ${this.fechaInicio} hasta ${this.fechaFin}.`, 10, 90);
    doc.text(`Certificante: ____________________`, 10, 110);
    doc.text(`Firma de quien certifica: ____________________`, 10, 120);

    doc.save('certificado.pdf');
  }

  home() {
    this.router.navigate(['/home']);
  }

  volver() {
    this.router.navigate(['/emision-certificado']);
  }
  
  irABuscar(){
    this.router.navigate(['/buscar']);
  }

}
