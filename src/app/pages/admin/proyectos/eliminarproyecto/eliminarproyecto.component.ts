import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Proyectos } from '../../../../models/proyecto.model';

@Component({
  selector: 'app-eliminarproyecto',
  standalone: true,
  imports: [],
  templateUrl: './eliminarproyecto.component.html',
  styleUrl: './eliminarproyecto.component.scss'
})
export class EliminarproyectoComponent {
  @Input() proyectos!: Proyectos;
  @Output() onCancel = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<number>();

  
  eliminar(): void {
    this.onDelete.emit(this.proyectos.id)
  }

  cancelar() {
    this.onCancel.emit();
  }

}
