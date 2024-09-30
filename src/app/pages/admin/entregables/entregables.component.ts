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

@Component({
  selector: 'app-entregables',
  standalone: true,
  imports: [RouterLink,
    CommonModule, EditarEntregablesComponent,
    EliminarEntregablesComponent, DetallesComponent,
    CrearEntregableComponent, BuscarComponent, SubirEntregablesComponent],
  templateUrl: './entregables.component.html',
  styleUrls: ['./entregables.component.scss']
})
export class EntregablesComponent implements OnInit {
  entregables: Entregable[] = [
  //   { id: 1, nombre: 'Entregable 1', descripcion: 'Descripción 1', estado: 'Completado', fecha: '2023-08-01' },
  //   { id: 2, nombre: 'Entregable 2', descripcion: 'Descripción 2', estado: 'Pendiente', fecha: '2023-08-15' },
  //   { id: 3, nombre: 'Entregable 3', descripcion: 'Descripción 3', estado: 'En progreso', fecha: '2023-08-20' }
  ];
  userRole: string | null='';


  selectedEntregable: any = null;
  selectedEntregableEliminar: Entregable | null = null;
  entregableSeleccionado: Entregable | null = null;
  crearNuevoEntregable: boolean = false;
  mostrarModalEliminar = false;

  constructor(private router:Router, private entregableService: EntregableService, private authService: AuthService) {
    this.cargarEntregables();
    this.userRole = this.authService.getUserRole() || 'Usuario';
   }

  irABuscar(){
    this.router.navigate(['/buscar']);
  }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
     console.log('Rol del usuario:', this.userRole);
    this.cargarEntregables();
  }

  cargarEntregables(){
    this.entregableService.ObtenerEntregables().subscribe(entregables => {
      console.log('Entregables cargados:', entregables);
      this.entregables = entregables;
    }, error => {
      console.error('Error al cargar los entregables: ', error);
    });
  }

  // Métodos para editar entregables
  editarEntregable(id: number) {
    this.router.navigate(['/editar-entregables', id.toString()]);
  }

  // Métodos para eliminar entregables
  eliminarEntregable(id: number, nombre: string) {
    this.selectedEntregableEliminar = this.entregables.find(entregable => entregable.id === id) || null;
    this.mostrarModalEliminar = true; 
  }
  

  cerrarModal(){
    this.mostrarModalEliminar = false;
  }

  confirmarEliminacion(): void {
    if (this.selectedEntregableEliminar) {
      this.entregableService.eliminarEntregable(this.selectedEntregableEliminar.id.toString()).then(() => {
        console.log('Entregable eliminado con éxito');
        this.mostrarModalEliminar = false;
        this.selectedEntregableEliminar = null;
        this.cargarEntregables(); // Recargar la lista
      }).catch(error => {
        console.error('Error al eliminar el entregable', error);
      });
    }
  }
  

  cancelarEliminacion(): void {
    this.mostrarModalEliminar = false;
    this.selectedEntregableEliminar = null;
  }

  // metodo para detalles
  abrirDetalles(id: number){
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
  crearEntregable() {
    this.router.navigate(['/crear-entregable']);
  }

  guardarNuevoEntregable(entregable: Entregable){
    this.entregableService.crearEntregables(entregable).then(()=> {
      console.log('Entregable guardado correctamente');
      this.crearNuevoEntregable = false;
    }).catch((error) => {
      console.error('Error al guardar el entregable', error);
    });
  }

  cancelarCreacion(){
    this.crearNuevoEntregable = false;
  }

  subirEntregable(){
    this.router.navigate(['/subir-entregables'])
  }
}
