// src/app/models/entregable.model.ts
export interface Entregable {
  numeroId: string;  // Por ejemplo, "1.pm.2.1"
  id: number;
  nombre: string;
  descripcion: string;
  estado: string;
  fecha: string;
}

export interface Deliverable {
  id: number;
  nombre: string;
  descripcion: string;
  estado: string;
  fecha_creacion: string;
  codigo: string;
  project: number;
  categoria: string;
  actividad: string;
}
