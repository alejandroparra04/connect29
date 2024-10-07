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


@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule,
    RouterLink, CrearproyectoComponent,
    EliminarproyectoComponent, DetallesComponent,
    BuscarComponent, FormsModule],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.scss'
})
export class ProyectosComponent implements OnInit {
  proyectos: Proyectos[] = [];
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

    this.authService.getUsers().subscribe(
      (res) => {
        this.usuarios = res;

        const currentUser = this.usuarios.find((user: { email: string | null; }) => user.email === this.currentUserEmail);
        if (currentUser) {
          this.proyectoEditar.responsable_id = currentUser.id;
        }
      },
      (error) => {
        console.error('Error al cargar los usuarios:', error);
      }
    );
  }

  cargarProyectos() {
    this.proyectoService.obtenerProyectos().subscribe({
      next: (proyectos) => {
        this.proyectos = proyectos;
      },
      error: (error) => {
        console.error('Error al cargar los proyectos:', error);
      },
    });
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
      },
      error: (error) => {
        console.error('Error al actualizar el proyecto:', error);
      },
    });
  }


  //metodo para editar un proyecto
  editarProyectos(id: number) {
    this.router.navigate(['/editarproyectos', id.toString()]);
  }

  //metodo para eliminar un proyecto
  eliminarProyecto(id: number, nombre: string) {
    this.proyectoEliminar = this.proyectos.find(proyectos => proyectos.id === id) || null;
    this.mostrarModalEliminar = true;
  }

  cerrarModal() {
    this.mostrarModalEliminar = false;
  }

  confirmarEliminacion() {
    if (this.proyectoEliminar) {
      this.proyectoService.eliminarProyecto(this.proyectoEliminar.id).subscribe({
        next: () => {
          this.cargarProyectos();
          this.cancelarEliminacion();
        },
        error: (error) => {
          console.error('Error al eliminar el proyecto:', error);
        },
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
