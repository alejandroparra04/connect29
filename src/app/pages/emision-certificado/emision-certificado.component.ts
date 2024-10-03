import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-emision-certificado',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './emision-certificado.component.html',
  styleUrl: './emision-certificado.component.scss'
})
export class EmisionCertificadoComponent {

  menuCerrado = false;

  constructor(private router: Router){}

  toggleMenu(){
    this.menuCerrado = !this.menuCerrado;
  }
  
  irABuscar(){
    this.router.navigate(['/buscar']);
  }
  
  volver() {
    this.router.navigate(['/generar-reporte']);
  }

  generarCertificado() {
    this.router.navigate(['/certificado'])
  }

  descargarCertificado() {
    this.router.navigate(['/certificado'])
  }
  

}
