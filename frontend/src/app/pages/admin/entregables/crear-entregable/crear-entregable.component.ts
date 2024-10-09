import { Component } from '@angular/core';
import { Entregable } from '../../../../models/entegable.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EntregableService } from '../../../../services/entregable.service';

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
  nuevoEntregable: Entregable = {
    id: 0,  // El ID se asignará al guardar
    numeroId: '',
    nombre: '',
    descripcion: '',
    estado: 'Pendiente',
    fecha: new Date().toISOString().slice(0, 10),

  };

  menuCerrado = false;

  selectedProyecto: any = null;
  selectedProceso: string = '';
  selectedActividad: any = null;

  entregables: Entregable[] = [];

  constructor(private router: Router, private entregableService: EntregableService) { }

  ngOnInit(): void {
    this.cargarEntregables();
  }

  cargarEntregables() {
    // this.entregableService.ObtenerEntregables().subscribe(entregables => {
    //   this.entregables = entregables;
    // }, error => {
    //   console.error('Error al cargar lo entregables', error);
    // });
  }

  crearEntregable(proyectoId: number, proceso: string, actividadId: number) {
    const numeroEntregable = this.obtenerUltimoNumeroEntregable(proyectoId, proceso, actividadId);
    const idJerarquico = `${proyectoId}.${proceso}.${actividadId}.${numeroEntregable}`;

    this.nuevoEntregable.numeroId = idJerarquico;

    this.guardarNuevoEntregable(this.nuevoEntregable);
  }

  guardarNuevoEntregable(entregable: Entregable) {
    // this.entregableService.crearEntregables(this.nuevoEntregable).then(() => {
    //   console.log('Entregable guardado correctamente con ID:', entregable.numeroId);
    //   this.router.navigate(['/entregables']);
    // }).catch((error) => {
    //   console.error('Error al crear el entregable', error);
    // });
  }

  obtenerUltimoNumeroEntregable(proyectoId: number, proceso: string, actividadId: number): number {
    const entregablesFiltrados = this.entregables.filter(entregable => {
      if (typeof entregable.numeroId === 'string') {
        return entregable.numeroId.startsWith(`${proyectoId}.${proceso}.${actividadId}`);
      } else {
        console.error('numeroId no es una cadena', entregable);
        return false; // O manejar el error de otra manera
      }
    });

    const ultimoEntregable = entregablesFiltrados.length > 0
      ? Math.max(...entregablesFiltrados.map(ent => parseInt(ent.numeroId.split('.').pop()!)))
      : 0;

    return ultimoEntregable + 1; // Devuelve el siguiente número
  }


  toggleMenu() {
    this.menuCerrado = !this.menuCerrado;
  }

  volver(): void {
    this.router.navigate(['/entregables']);
  }

  irHome(): void {
    this.router.navigate(['/home'])
  }

  irABuscar() {
    this.router.navigate(['/buscar']);
  }
}




