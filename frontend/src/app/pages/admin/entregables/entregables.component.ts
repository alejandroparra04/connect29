import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EditarEntregablesComponent } from './editar-entregables/editar-entregables.component';
import { EliminarEntregablesComponent } from './eliminar-entregables/eliminar-entregables.component';
import { DetallesComponent } from './detalles/detalles.component';
import { Deliverable, Entregable } from '../../../models/entegable.model';
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
  entregables: Deliverable[] = [];
  userRole: string | null = '';
  role: string | null = '';


  selectedEntregable: any = null;
  selectedEntregableEliminar: Entregable | null = null;
  entregableSeleccionado: Entregable | null = null;
  crearNuevoEntregable: boolean = false;
  mostrarModalEliminar = false;

  selectedProyecto: number | null = null;
  selectedActividad: number | null = null;
  nombreActividad: string = '';
  proceso: string = '';

  menuCerrado = false;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly entregableService: EntregableService,
    private readonly authService: AuthService) {

  }

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.route.paramMap.subscribe(params => {
      this.selectedProyecto = +params.get('idProyecto')!;  // Convierte el ID a number
      this.selectedActividad = +params.get('idActividad')!;
    });

    this.route.queryParams.subscribe(queryParams => {
      this.nombreActividad = queryParams['nombre'] || '';
      this.proceso = queryParams['proceso'] || '';
    });
    this.cargarEntregables();
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



  cargarEntregables() {

    this.entregableService.ObtenerEntregables(this.selectedProyecto!, this.proceso).subscribe({
      next: entregables => {
        this.entregables = entregables;
      },
      error: error => {
        console.error('Error al cargar los entregables', error);
      }
    });

  }

  // Métodos para editar entregables
  editarEntregable(id: number) {
    this.router.navigate(['/editar-entregables', id.toString()]);
  }

  // Métodos para eliminar entregables
  eliminarEntregable(numeroId: number, nombre: string) {
    // this.selectedEntregableEliminar = this.entregables.find(entregable => entregable.numeroId === numeroId) || null;
    // this.mostrarModalEliminar = true;
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
    this.router.navigate([`/crear-entregable/${this.selectedProyecto}/${this.selectedActividad}`],
      { queryParams: { nombre: this.nombreActividad, proceso: this.proceso } }
    );
  }

  guardarNuevoEntregable(entregable: Entregable) {

  }

  obtenerUltimoNumeroEntregable(proyectoId: number, proceso: string, actividadId: number): number {
    // const entregablesFiltrados = this.entregables.filter(entregables => {
    //   const numeroIdStr = entregables.numeroId?.toString();
    //   return numeroIdStr.startsWith(`${proyectoId}.${proceso}.${actividadId}`);
    // });

    // const ultimoEntregable = entregablesFiltrados.length > 0 ?
    //   Math.max(...entregablesFiltrados.map(e => parseInt(e.numeroId.split('.').pop()!))) : 0;
    // return ultimoEntregable + 1;

    return 0;
  }

  cancelarCreacion() {
    this.crearNuevoEntregable = false;
  }

  subirEntregable() {
    this.router.navigate(['/subir-entregables'])
  }
}
