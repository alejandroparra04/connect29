import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Proyectos } from '../../../../models/proyecto.model';
import { ProyectoService } from '../../../../services/proyecto.service';

@Component({
  selector: 'app-crearproyecto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './crearproyecto.component.html',
  styleUrl: './crearproyecto.component.scss'
})
export class CrearproyectoComponent {
   nuevoProyecto: Proyectos = {
    numeroId: 1,
     id: 0,  // El ID se asignará al guardar
     nombre: '',
    fecha_inicio: '',
     fecha_fin: '',
     responsable: '',
    descripcion: '',
   };

  constructor (private router: Router, private proyectoService: ProyectoService){}

  volver(): void{
    this.router.navigate(['/proyectos']);
  }

  irHome(): void{
    this.router.navigate(['/home'])
  }

  guardarNuevoProyecto() {
    this.proyectoService.crearProyecto(this.nuevoProyecto).then(()=> {
      alert('proyecto creado con éxito');
      this.router.navigate(['/proyectos']);
    }).catch ((error) => {
      console.error('Error al crear el proyecto', error);
    });
  }

  irABuscar(){
    this.router.navigate(['/buscar']);
  }
}
