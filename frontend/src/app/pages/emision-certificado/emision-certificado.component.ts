import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-emision-certificado',
  standalone: true,
  imports: [RouterLink, SidebarComponent, NavbarComponent],
  templateUrl: './emision-certificado.component.html',
  styleUrl: './emision-certificado.component.scss'
})
export class EmisionCertificadoComponent {

  menuCerrado = false;

  constructor(private readonly router: Router) { }

  toggleMenu() {
    this.menuCerrado = !this.menuCerrado;
  }

  irABuscar() {
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
