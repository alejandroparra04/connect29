// Define la interfaz para un entregable
interface Entregable {
    id: number;
    nombre: string;
    estado: string;
  }
  
  // Define la interfaz para un proyecto, que incluye entregables
  interface Proyectos {
    id: number;
    nombre: string;
    fechaInicio: string;
    fechaFin: string;
    estado: string;
    progreso?: number;  // progreso es opcional
    entregables?: Entregable[];  // entregables es opcional
  }
  