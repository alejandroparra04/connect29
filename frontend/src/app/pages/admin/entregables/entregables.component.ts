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
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-entregables',
  standalone: true,
  imports: [RouterLink,
    CommonModule, EditarEntregablesComponent,
    EliminarEntregablesComponent, DetallesComponent,
    CrearEntregableComponent, BuscarComponent, SubirEntregablesComponent,
    FormsModule,
    SidebarComponent, NavbarComponent,
  ],
  templateUrl: './entregables.component.html',
  styleUrls: ['./entregables.component.scss']
})
export class EntregablesComponent implements OnInit {
  entregables: Deliverable[] = [];
  entregablesFiltrados: Deliverable[] = [];
  filtroBusqueda: string = '';
  userRole: string | null = '';
  role: string | null = '';


  selectedEntregable: any = null;
  selectedEntregableEliminar: Entregable | null = null;
  crearNuevoEntregable: boolean = false;
  mostrarModalEliminar = false;
  mostrarModalEditar = false;
  mostrarModalSubir = false;

  selectedProyecto: number | null = null;
  selectedActividad: number | null = null;
  nombreActividad: string = '';
  proceso: string = '';

  menuCerrado = false;

  selectedFile: File | null = null;

  entregableEditar: Deliverable = {
    id: 0,
    nombre: '',
    estado: '',
    fecha_creacion: '',
    codigo: '',
    descripcion: '',
    project: 0,
    categoria: '',
    actividad: ''
  }

  entregableSeleccionado: Deliverable = {
    id: 0,
    nombre: '',
    estado: '',
    fecha_creacion: '',
    codigo: '',
    descripcion: '',
    project: 0,
    categoria: '',
    actividad: ''
  }


  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
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
    if (this.proceso === 'PM') {
      this.router.navigate([`/actividad-pm/${this.selectedProyecto}`]);
    } else {
      this.router.navigate([`/actividad-si/${this.selectedProyecto}`]);
    }
  }

  irABuscar() {
    this.router.navigate(['/buscar']);
  }

  abrirModalEditar(entregable: Deliverable): void {
    this.entregableEditar = { ...entregable }; // Clonamos el proyecto para editar
    this.mostrarModalEditar = true;
  }


  cargarEntregables() {

    this.entregableService.ObtenerEntregables(this.selectedProyecto!, this.proceso).subscribe({
      next: entregables => {
        this.entregables = entregables;
        this.entregablesFiltrados = entregables.filter(
          (entregable: { actividad: string; }) => entregable.actividad === this.nombreActividad
        );
      },
      error: error => {
        console.error('Error al cargar los entregables', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar información',
          text: 'Error al cargar los entregables. Por favor, contacte al administrador.',
        })
      }
    });
  }

  filtrarEntregables() {
    const filtro = this.filtroBusqueda.toLowerCase();
    this.entregablesFiltrados = this.entregables.filter((entregable) =>
      entregable.nombre.toLowerCase().includes(filtro) ||
      entregable.codigo.toLowerCase().includes(filtro)
    );
  }

  // Métodos para editar entregables
  editarEntregable(id: number) {
    this.router.navigate(['/editar-entregables', id.toString()]);
  }

  // Métodos para eliminar entregables
  eliminarEntregable(id: number) {
    this.selectedEntregable = this.entregables.find(entregable => entregable.id === id) || null;
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
    this.router.navigate([`/generar-reporte/${this.selectedProyecto}/${this.selectedActividad}`],
      { queryParams: { nombre: this.nombreActividad, proceso: this.proceso } }
    );

  }

  crearEntregableConDatos() {
    this.router.navigate([`/crear-entregable/${this.selectedProyecto}/${this.selectedActividad}`],
      { queryParams: { nombre: this.nombreActividad, proceso: this.proceso } }
    );
  }

  cancelarEdicion(): void {
    this.mostrarModalEditar = false;
    this.entregableEditar = {
      id: 0,
      nombre: '',
      estado: '',
      fecha_creacion: '',
      codigo: '',
      descripcion: '',
      project: 0,
      categoria: '',
      actividad: ''
    }
  }

  guardarCambios(): void {
    this.entregableService.actualizarEntregable(this.entregableEditar).subscribe({
      next: () => {
        this.cancelarEdicion();
        this.cargarEntregables();
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


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    } else {
      console.log("No se seleccionó ningún archivo");
    }
  }

  onSubmit(): void {

    if (this.selectedFile && this.entregableSeleccionado) {
      const codigoEntregable = this.entregableSeleccionado.codigo;

      const formData = new FormData();
      formData.append('archivo', this.selectedFile);
      formData.append('codigo_entregable', codigoEntregable);

      this.entregableService.subirArchivo(formData).subscribe({
        next: (response: any) => {
          console.log("Respuesta del servidor:", response);
          Swal.fire({
            icon: 'success',
            title: 'Archivo subido exitosamente',
            text: `Archivo disponible en: ${response.file_url}`,
          });
          this.cerrarModalSubir();
        },
        error: (error: any) => {
          this.cerrarModalSubir();
          console.error('Error al subir archivo:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al subir archivo',
            text: 'Hubo un problema al subir el archivo o la ruta no existe',
            customClass: {
              popup: 'swal2-modal-zindex'
            }
          });
        }
      });
    } else {
      this.cerrarModalSubir();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor selecciona un archivo PDF para subir',
      });
    }
  }

  // Método para abrir el modal de subir
  subirEntregable(entregable: Deliverable): void {
    this.entregableSeleccionado = { ...entregable };
    this.mostrarModalSubir = true;
  }

  // Método para cerrar el modal de subir
  cerrarModalSubir(): void {
    this.mostrarModalSubir = false;
    this.selectedFile = null;
  }

}
