import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { EntregableService } from '../../../../services/entregable.service';

@Component({
  selector: 'app-actividad-si',
  standalone: true,
  imports: [RouterLink, SidebarComponent, NavbarComponent],
  templateUrl: './actividad-si.component.html',
  styleUrl: './actividad-si.component.scss'
})
export class ActividadSiComponent {
  proyectoId: string;
  actividades_si: { id: number; nombre_actividad: string; }[] = [];


  menuCerrado = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly entregableService: EntregableService) {
    this.proyectoId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.ObtenerActividades();
  }

  ObtenerActividades() {
    this.entregableService.ObtenerActividades('SI').subscribe({
      next: (data: string[]) => {
        this.actividades_si = data.map((actividad, index) => ({
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

  Entregables(actividadId: number, nombreActividad: string) {
    this.router.navigate([`/entregables/${this.proyectoId}/${actividadId}`], {
      queryParams: { nombre: nombreActividad, proceso: 'SI' }
    });
  }
}
