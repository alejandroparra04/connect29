import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CrearproyectoComponent } from './crearproyecto/crearproyecto.component';
import { Proyectos } from '../../../models/proyecto.model';
import { ProyectoService } from '../../../services/proyecto.service';
import { ProcesosComponent } from './procesos/procesos.component';
import { EliminarproyectoComponent } from "./eliminarproyecto/eliminarproyecto.component";
import { DetallesComponent } from '../entregables/detalles/detalles.component';
import { BuscarComponent } from "../buscar/buscar.component";
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule,
    RouterLink, CrearproyectoComponent,
    EliminarproyectoComponent, DetallesComponent,
    BuscarComponent, FormsModule,
    SidebarComponent, NavbarComponent, MatIconModule
  ],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.scss'
})
export class ProyectosComponent implements OnInit {
  proyectos: Proyectos[] = [];
  proyectosFiltrados: Proyectos[] = [];
  filtroBusqueda: string = '';
  usuarios: any = [];
  role: string | null = '';

  selectedProyecto: any = null;
  proyectoEliminar: any = [];
  proyectoEditar: any = {
    nombre: '',
    responsable_id: null,
    fecha_inicio: '',
    fecha_fin: '',
    descripcion: '',
  };
  proyectoSeleccionado: Proyectos | null = null;
  crearNuevoProyecto: boolean = false;
  mostrarModalEditar = false;
  mostrarModalEliminar = false;
  currentUserEmail: string | null = '';
  menuCerrado = false;

  constructor(
    private readonly router: Router,
    private readonly proyectoService: ProyectoService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.cargarProyectos();
    this.currentUserEmail = this.authService.getEmail();

    this.authService.getUsers().subscribe({
      next: (res) => {
        this.usuarios = res;

        const currentUser = this.usuarios.find((user: { email: string | null; }) => user.email === this.currentUserEmail);
        if (currentUser) {
          this.proyectoEditar.responsable_id = currentUser.id;
        }
      },
      error: (error) => {
        console.error('Error al cargar los usuarios:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar los usuarios, contacte al administrador',
        })
      },
    });
  }

  cargarProyectos() {
    this.proyectoService.obtenerProyectos().subscribe({
      next: (proyectos) => {
        this.proyectos = proyectos;
        this.proyectosFiltrados = proyectos;
      },
      error: (error) => {
        console.error('Error al cargar los proyectos:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar los proyectos, contacte al administrador',
        })
      },
    });
  }

  // Método para filtrar proyectos
  filtrarProyectos() {
    const filtro = this.filtroBusqueda.toLowerCase();
    this.proyectosFiltrados = this.proyectos.filter((proyecto) =>
      proyecto.nombre.toLowerCase().includes(filtro) ||
      proyecto.responsable.toLowerCase().includes(filtro)
    );
  }

  toggleMenu() {
    this.menuCerrado = !this.menuCerrado;
  }

  irABuscar() {
    this.router.navigate(['/buscar']);
  }


  abrirModalEditar(proyecto: any): void {
    this.proyectoEditar = { ...proyecto }; // Clonamos el proyecto para editar
    this.mostrarModalEditar = true;
  }

  cancelarEdicion(): void {
    this.mostrarModalEditar = false;
    this.proyectoEditar = {
      nombre: '',
      responsable_id: null,
      fecha_inicio: '',
      fecha_fin: '',
      descripcion: '',
    };
  }

  guardarCambios(): void {
    this.proyectoService.actualizarProyecto(this.proyectoEditar).subscribe({
      next: () => {
        this.cancelarEdicion();
        this.cargarProyectos();
        Swal.fire({
          icon: 'success',
          title: 'Proyecto actualizado exitosamente',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: (error) => {
        console.error('Error al actualizar el proyecto:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar el proyecto',
          text: 'Hubo un problema al actualizar los datos',
        });
      },
    });
  }


  //metodo para editar un proyecto
  editarProyectos(id: number) {
    this.router.navigate(['/editarproyectos', id.toString()]);
  }

  //metodo para eliminar un proyecto
  eliminarProyecto(id: number) {
    this.proyectoEliminar = this.proyectos.find(proyectos => proyectos.id === id) || null;
    this.mostrarModalEliminar = true;
  }

  cerrarModal() {
    this.mostrarModalEliminar = false;
  }

  confirmarEliminacion(): void {
    if (this.proyectoEliminar) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.proyectoService.eliminarProyecto(this.proyectoEliminar.id).subscribe({
            next: () => {
              this.cargarProyectos();
              this.cancelarEliminacion();
              Swal.fire(
                'Eliminado',
                'El proyecto ha sido eliminado.',
                'success'
              );
            },
            error: (error) => {
              console.error('Error al eliminar el proyecto:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error al eliminar',
                text: 'Hubo un problema al eliminar el proyecto',
              });
            },
          });
        }
      });
    }
  }

  cancelarEliminacion() {
    this.mostrarModalEliminar = false;
    this.proyectoEliminar = null;
  }

  //metodo para ver detalles del proyecto
  verDetalles(id: number): void {
    this.router.navigate(['/detallesproyecto', id.toString()]);
  }

  //metodo para crear un nuevo proyecto
  crearProyecto() {
    this.router.navigate(['/crearproyecto']);
  }

  guardarNuevoProyecto(proyecto: Proyectos) {

  }

  cancelarCreacion() {
    this.crearNuevoProyecto = false;
  }

  trackById(index: number, proyecto: Proyectos): number {
    return proyecto.id;
  }

  Procesos(id: number) {
    this.router.navigate(['/procesos', id.toString()]);
  }
}
