import { Component } from '@angular/core';
import { Entregable } from '../../../../models/entegable.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EntregableService } from '../../../../services/entregable.service'; 

@Component({
  selector: 'app-crear-entregable',
  standalone: true,
  imports: [RouterLink,CommonModule, FormsModule],
  templateUrl: './crear-entregable.component.html',
  styleUrl: './crear-entregable.component.scss'
})
export class CrearEntregableComponent {
  nuevoEntregable: Entregable = {
    numeroId: 1,
    id: 0,  // El ID se asignará al guardar
    nombre: '',
    descripcion: '',
    estado: '',
    fecha: '',
  };
  constructor(private router: Router, private entregableService: EntregableService){}
  
  volver(): void{
    this.router.navigate(['/entregables']);
  }

  irHome(): void{
    this.router.navigate(['/home'])
  }

  guardarNuevoEntregable() {
    this.entregableService.crearEntregables(this.nuevoEntregable).then(()=> {
      alert('Entregable creado con éxito');
      this.router.navigate(['/entregables']);
    }).catch ((error) => {
      console.error('Error al crear el entregable', error);
    });
  }

  irABuscar(){
    this.router.navigate(['/buscar']);
  }
}
