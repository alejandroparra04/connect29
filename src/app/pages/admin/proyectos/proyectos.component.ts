import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CrearproyectoComponent } from './crearproyecto/crearproyecto.component';
import {Proyectos} from '../../../models/proyecto.model';
import { ProyectoService } from '../../../services/proyecto.service';
import { EliminarproyectoComponent } from "./eliminarproyecto/eliminarproyecto.component";
import { DetallesComponent } from '../entregables/detalles/detalles.component';
import { BuscarComponent } from "../buscar/buscar.component";
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, 
    RouterLink, CrearproyectoComponent, 
    EliminarproyectoComponent, DetallesComponent, 
    BuscarComponent],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.scss'
})
export class ProyectosComponent implements OnInit {
  proyectos: Proyectos[] = [
  //   {id: 1, nombre: 'Proyecto 1', descripcion: 'Descripcion 1', fecha_inicio: '2023-02-01', fecha_fin: '2023-08-01', responsable: 'Pepito Perez'},
  //   {id: 2, nombre: 'Proyecto 2', descripcion: 'Descripcion 2', fecha_inicio: '2023-02-15', fecha_fin: '2023-08-15', responsable: 'Pepito Perez'},
  //   {id: 3, nombre: 'Proyecto 3', descripcion: 'Descripcion 3', fecha_inicio: '2023-02-20', fecha_fin: '2023-08-20', responsable: 'Pepito Perez'},
   ];
   userRole: string | null = '';

  selectedProyecto: any = null;
  proyectoEliminar: any = [];
  proyectoSeleccionado: Proyectos | null = null;
  crearNuevoProyecto: boolean = false;
  mostrarModalEliminar = false;

  constructor(private router:Router, private proyectoService: ProyectoService) {
    this.cargarProyectos();
  }

  irABuscar(){
    this.router.navigate(['/buscar']);
  }

  ngOnInit(): void {}
  
  cargarProyectos(){
     this.proyectoService.obtenerProyectos().subscribe(proyectos => {
      console.log(proyectos);
      this.proyectos = proyectos;
    }, error => {
      console.error('Error al cargar proyectos: ', error);
    } );
  }

   //metodo para editar un proyecto
   editarProyectos(id: number) {
    this.router.navigate(['/editarproyectos', id.toString()]);
  }

    //metodo para eliminar un proyecto
    eliminarProyecto(id: number, nombre: string ){
       this.proyectoEliminar = this.proyectos.find(proyectos => proyectos.id === id) || null;
       this.mostrarModalEliminar = true;
    }

    cerrarModal() {
      this.mostrarModalEliminar = false;
    }

    confirmarEliminacion() {
      if(this.proyectoEliminar) {
        this.proyectoService.eliminarProyecto(this.proyectoEliminar.id.toString()).then(() => {
          console.log('Poryecto elimiando con éxito');
          this.mostrarModalEliminar = false;
          this.proyectoEliminar = null;
          this.cargarProyectos();
        }).catch(error => {
          console.error('Error al eliminar el entregable', error);
        });
      }
    }

       cancelarEliminacion(){
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

  guardarNuevoProyecto(proyecto: Proyectos){
    this.proyectoService.crearProyecto(proyecto).then(()=> {
      console.log('Proyecto guardado correctamente');
      this.crearNuevoProyecto = false;
    }).catch((error) => {
      console.error('Error al guardar el proyecto', error);
    });
  }

  cancelarCreacion(){
    this.crearNuevoProyecto = false;
  }

  Procesos(){
    this.router.navigate(['/procesos']);
  }



}
