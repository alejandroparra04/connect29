import { Entregable } from "./entegable.model";

 export interface Proyectos {
   numeroId: number;
    id: number;
    nombre: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_fin: string;
    responsable: string;
    progreso?: number;
 }
  