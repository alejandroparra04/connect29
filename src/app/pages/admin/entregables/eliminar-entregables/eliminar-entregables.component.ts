import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Entregable } from '../../../../models/entegable.model';

@Component({
  selector: 'app-eliminar-entregables',
  standalone: true,
  imports: [],
  templateUrl: './eliminar-entregables.component.html',
  styleUrl: './eliminar-entregables.component.scss'
})
export class EliminarEntregablesComponent {
  @Input() entregable!: Entregable;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onCancel = new EventEmitter<void>();

  confirmarEliminacion(): void {
    this.onDelete.emit(this.entregable.id);
  }

  cancelar(): void {
    this.onCancel.emit();  
  }

}

