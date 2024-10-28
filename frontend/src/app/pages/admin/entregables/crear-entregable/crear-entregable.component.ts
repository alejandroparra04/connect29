import { Component } from '@angular/core';
import { Deliverable } from '../../../../models/entegable.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EntregableService } from '../../../../services/entregable.service';

import Swal from 'sweetalert2';

import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';

@Component({
  selector: 'app-crear-entregable',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, SidebarComponent, NavbarComponent],
  templateUrl: './crear-entregable.component.html',
  styleUrl: './crear-entregable.component.scss'
})
export class CrearEntregableComponent {
  nuevoEntregable: Deliverable = {
    id: 0,
    nombre: '',
    estado: 'Pendiente',
    fecha_creacion: new Date().toISOString().slice(0, 10),
    codigo: '',
    descripcion: '',
    project: 0,
    categoria: '',
    actividad: '',
  };

  menuCerrado = false;

  selectedProyecto: number | null = null;
  selectedActividad: number | null = null;
  nombreActividad: string = '';
  proceso: string = '';

  entregables: Deliverable[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly entregableService: EntregableService) { }

  ngOnInit(): void {
    // this.cargarEntregables();

    this.route.paramMap.subscribe(params => {
      this.selectedProyecto = +params.get('idProyecto')!;  // Convierte el ID a number
      this.selectedActividad = +params.get('idActividad')!;
    });

    this.route.queryParams.subscribe(queryParams => {
      this.nombreActividad = queryParams['nombre'] || '';
      this.proceso = queryParams['proceso'] || '';
    });
  }

  cargarEntregables() {
    // this.entregableService.ObtenerEntregables().subscribe(entregables => {
    //   this.entregables = entregables;
    // }, error => {
    //   console.error('Error al cargar lo entregables', error);
    // });
  }

  crearEntregable() {
    if (this.selectedProyecto && this.selectedActividad) {
      const entregable: Deliverable = {
        id: 0,
        nombre: this.nuevoEntregable.nombre,
        descripcion: this.nuevoEntregable.descripcion,
        estado: this.nuevoEntregable.estado,
        fecha_creacion: this.nuevoEntregable.fecha_creacion,
        codigo: '',
        project: this.selectedProyecto,
        categoria: this.proceso,
        actividad: this.nombreActividad,
      };

      this.entregableService.crearEntregable(entregable, this.selectedProyecto, this.proceso).subscribe({
        next: (res) => {
          console.log('Entregable guardado correctamente', res);
          Swal.fire({
            icon: 'success',
            title: 'Entregable creado exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
          this.volver();
        },
        error: (error) => {
          console.error('Error al crear el entregable', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al crear el entregable',
            text: 'Ha ocurrido un error al crear el entregable',
          })
        }
      })

    } else {
      console.error('Faltan datos para crear el entregable');
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el entregable',
        text: 'Faltan datos para crear el entregable',
      })
    }
  }


  guardarNuevoEntregable(entregable: Deliverable) {
    // this.entregableService.crearEntregables(this.nuevoEntregable).then(() => {
    //   console.log('Entregable guardado correctamente con ID:', entregable.numeroId);
    //   this.router.navigate(['/entregables']);
    // }).catch((error) => {
    //   console.error('Error al crear el entregable', error);
    // });
  }

  obtenerUltimoNumeroEntregable(proyectoId: number, proceso: string, actividadId: number): number {
    // const entregablesFiltrados = this.entregables.filter(entregable => {
    //   if (typeof entregable.numeroId === 'string') {
    //     return entregable.numeroId.startsWith(`${proyectoId}.${proceso}.${actividadId}`);
    //   } else {
    //     console.error('numeroId no es una cadena', entregable);
    //     return false; // O manejar el error de otra manera
    //   }
    // });

    // const ultimoEntregable = entregablesFiltrados.length > 0
    //   ? Math.max(...entregablesFiltrados.map(ent => parseInt(ent.numeroId.split('.').pop()!)))
    //   : 0;

    // return ultimoEntregable + 1; // Devuelve el siguiente número

    return 0;
  }


  toggleMenu() {
    this.menuCerrado = !this.menuCerrado;
  }

  volver(): void {
    this.router.navigate([`/entregables/${this.selectedProyecto}/${this.selectedActividad}`],
      { queryParams: { nombre: this.nombreActividad, proceso: this.proceso } }
    );
  }

  irHome(): void {
    this.router.navigate(['/home'])
  }

  irABuscar() {
    this.router.navigate(['/buscar']);
  }
}




