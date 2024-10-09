import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EditarEntregablesComponent } from './editar-entregables/editar-entregables.component';
import { EliminarEntregablesComponent } from './eliminar-entregables/eliminar-entregables.component';
import { DetallesComponent } from './detalles/detalles.component';
import { Entregable } from '../../../models/entegable.model';
import { CrearEntregableComponent } from './crear-entregable/crear-entregable.component';
import { BuscarComponent } from "../buscar/buscar.component";
import { SubirEntregablesComponent } from './subir-entregables/subir-entregables.component';
import { EntregableService } from '../../../services/entregable.service';
import { AuthService } from '../../../services/auth.service';

import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-entregables',
  standalone: true,
  imports: [RouterLink,
    CommonModule, EditarEntregablesComponent,
    EliminarEntregablesComponent, DetallesComponent,
    CrearEntregableComponent, BuscarComponent, SubirEntregablesComponent,
    SidebarComponent, NavbarComponent
  ],
  templateUrl: './entregables.component.html',
  styleUrls: ['./entregables.component.scss']
})
export class EntregablesComponent implements OnInit {
  entregables: Entregable[] = [
    //   { id: 1, nombre: 'Entregable 1', descripcion: 'Descripción 1', estado: 'Completado', fecha: '2023-08-01' },
    //   { id: 2, nombre: 'Entregable 2', descripcion: 'Descripción 2', estado: 'Pendiente', fecha: '2023-08-15' },
    //   { id: 3, nombre: 'Entregable 3', descripcion: 'Descripción 3', estado: 'En progreso', fecha: '2023-08-20' }
  ];
  userRole: string | null = '';


  selectedEntregable: any = null;
  selectedEntregableEliminar: Entregable | null = null;
  entregableSeleccionado: Entregable | null = null;
  crearNuevoEntregable: boolean = false;
  mostrarModalEliminar = false;

  selectedProyecto: any = null;
  selectedProceso: string = '';
  selectedActividad: any = null;

  menuCerrado = false;

  constructor(private router: Router, private entregableService: EntregableService, private authService: AuthService) {
    this.cargarEntregables();
    this.userRole = this.authService.getUserRole() || 'Usuario';
  }

  toggleMenu() {
    this.menuCerrado = !this.menuCerrado;
  }

  trackById(index: number, entregable: Entregable): string {
    return entregable.numeroId;
  }

  volver() {
    this.router.navigate(['/procesos']);
  }

  irABuscar() {
    this.router.navigate(['/buscar']);
  }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    console.log('Rol del usuario:', this.userRole);
    this.cargarEntregables();
  }

  cargarEntregables() {

  }

  // Métodos para editar entregables
  editarEntregable(id: number) {
    this.router.navigate(['/editar-entregables', id.toString()]);
  }

  // Métodos para eliminar entregables
  eliminarEntregable(numeroId: string, nombre: string) {
    this.selectedEntregableEliminar = this.entregables.find(entregable => entregable.numeroId === numeroId) || null;
    this.mostrarModalEliminar = true;
  }


  cerrarModal() {
    this.mostrarModalEliminar = false;
  }

  confirmarEliminacion(): void {

  }


  cancelarEliminacion(): void {
    this.mostrarModalEliminar = false;
    this.selectedEntregableEliminar = null;
  }

  // metodo para detalles
  abrirDetalles(id: number) {
    this.router.navigate(['/detalles', id.toString()])
  }

  cerrarDetalles(): void {
    this.selectedEntregable = null;
  }
  // metodo para generar reporte
  generarReporte() {
    this.router.navigate(['/generar-reporte']);

  }
  //metodo para crea entregables
  crearEntregable(proyectoId: number, proceso: string, actividadId: number, numeroEntregable: number) {
    this.router.navigate(['/crear-entregable']);

    const idJerarquico = `${proyectoId}.${proceso}.${actividadId}.${numeroEntregable}`;

    const nuevoEntregable: Entregable = {
      id: 0,
      numeroId: idJerarquico,
      nombre: 'Nuevo Entregable',
      descripcion: 'Descripción del nuevo entregable',
      estado: 'Pendiente',
      fecha: new Date().toISOString().slice(0, 10),
    };

    this.guardarNuevoEntregable(nuevoEntregable);
  }

  crearEntregableConDatos() {
    this.router.navigate(['/crear-entregable']);
    if (!this.selectedProyecto || !this.selectedProceso || !this.selectedActividad) {
      console.error('Proyecto, proceso o actividad no seleccionados correctamente.');
      return;
    }

    const proyectoId = this.selectedProyecto.id;
    const proceso = this.selectedProceso; // 'pm' o 'si'
    const actividadId = this.selectedActividad.id;
    const numeroEntregable = this.obtenerUltimoNumeroEntregable(proyectoId, proceso, actividadId);

    // Llama a la función que crea el entregable
    this.crearEntregable(proyectoId, proceso, actividadId, numeroEntregable);
  }

  guardarNuevoEntregable(entregable: Entregable) {

  }

  obtenerUltimoNumeroEntregable(proyectoId: number, proceso: string, actividadId: number): number {
    const entregablesFiltrados = this.entregables.filter(entregables => {
      const numeroIdStr = entregables.numeroId?.toString();
      return numeroIdStr.startsWith(`${proyectoId}.${proceso}.${actividadId}`);
    });

    const ultimoEntregable = entregablesFiltrados.length > 0 ?
      Math.max(...entregablesFiltrados.map(e => parseInt(e.numeroId.split('.').pop()!))) : 0;
    return ultimoEntregable + 1;
  }

  cancelarCreacion() {
    this.crearNuevoEntregable = false;
  }

  subirEntregable() {
    this.router.navigate(['/subir-entregables'])
  }
}
