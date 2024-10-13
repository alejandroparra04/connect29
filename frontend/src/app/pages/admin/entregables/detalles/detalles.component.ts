import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Deliverable } from '../../../../models/entegable.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EntregableService } from '../../../../services/entregable.service';
import { ProyectoService } from '../../../../services/proyecto.service';

import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { findIndex, map, Observable } from 'rxjs';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, SidebarComponent, NavbarComponent],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.scss'
})
export class DetallesComponent {
  entregable: Deliverable = {
    id: 0,
    nombre: '',
    descripcion: '',
    estado: '',
    fecha_creacion: '',
    codigo: '',
    project: 0,
    categoria: '',
    actividad: '',
  };
  menuCerrado = false;
  idActividad = 0;

  proyecto: string = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly entregableService: EntregableService,
    private readonly proyectoService: ProyectoService
  ) { }

  toggleMenu() {
    this.menuCerrado = !this.menuCerrado;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('idProyecto')!;
    if (id) {
      this.entregableService.obtenerEntregablePorId(id).subscribe({
        next: (entregable) => {
          this.entregable = entregable;
          this.obtenerIdActividad();
          this.obtenerDatosProyecto(entregable.project);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  volver(): void {
    this.router.navigate([`/entregables/${this.entregable.project}/${this.idActividad}`],
      { queryParams: { nombre: this.entregable.actividad, proceso: this.entregable.categoria } }
    );
  }

  obtenerIdActividad(): void {
    this.entregableService.ObtenerActividades(this.entregable.categoria).subscribe((actividades: string[]) => {
      const actividadNormalizada = this.entregable.actividad.trim().toLowerCase();
      const index = actividades.findIndex((actividad) =>
        actividad.trim().toLowerCase() === actividadNormalizada
      );
      if (index !== -1) {
        this.idActividad = index + 1;
      } else {
        console.log("Actividad no encontrada");
      }
    });
  }

  obtenerDatosProyecto(id: number): void {
    this.proyectoService.obtenerProyectoPorId(id).subscribe((proyecto) => {
      this.proyecto = `id: ${proyecto.id}, nombre: ${proyecto.nombre}`;
    })
  }


  irHome(): void {
    this.router.navigate(['/home'])
  }

  irABuscar() {
    this.router.navigate(['/buscar']);
  }

}
