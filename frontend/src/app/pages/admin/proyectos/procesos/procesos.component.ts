import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';

@Component({
  selector: 'app-procesos',
  standalone: true,
  imports: [RouterLink, SidebarComponent, NavbarComponent],
  templateUrl: './procesos.component.html',
  styleUrl: './procesos.component.scss'
})
export class ProcesosComponent {

  proyectoId: string;

  menuCerrado = false;

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {
    // Obtener el ID del proyecto de la ruta
    this.proyectoId = this.route.snapshot.paramMap.get('idProyecto')!;
  }
  toggleMenu() {
    this.menuCerrado = !this.menuCerrado;
  }


  volver() {
    this.router.navigate(['/proyectos']);
  }

  irABuscar() {
    this.router.navigate(['/buscar']);
  }

  ActividadPm() {
    this.router.navigate(['/actividad-pm', this.proyectoId]);
  }

  ActividadSi() {
    this.router.navigate(['/actividad-si', this.proyectoId]);
  }
}

