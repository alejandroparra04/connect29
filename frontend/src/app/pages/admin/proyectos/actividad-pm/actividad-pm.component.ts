import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EntregableService } from '../../../../services/entregable.service';

import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';

@Component({
  selector: 'app-actividad-pm',
  standalone: true,
  imports: [RouterLink, SidebarComponent, NavbarComponent],
  templateUrl: './actividad-pm.component.html',
  styleUrl: './actividad-pm.component.scss'
})
export class ActividadPmComponent {
  proyectoId: string;
  actividades_pm: { id: number; nombre_actividad: string; }[] = [];

  menuCerrado = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly entregableService: EntregableService
  ) {
    this.proyectoId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.ObtenerActividades();
  }

  ObtenerActividades() {
    this.entregableService.ObtenerActividades('PM').subscribe({
      next: (data: string[]) => {
        this.actividades_pm = data.map((actividad, index) => ({
          id: index + 1,
          nombre_actividad: actividad
        }));
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  toggleMenu() {
    this.menuCerrado = !this.menuCerrado;
  }

  volver() {
    this.router.navigate([`/procesos/${this.proyectoId}`]);
  }

  irABuscar() {
    this.router.navigate(['/buscar']);
  }

  Entregables() {
    this.router.navigate(['/entregables']);
  }
}
