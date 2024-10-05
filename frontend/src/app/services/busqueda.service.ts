import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, query, where } from '@angular/fire/firestore';
import  { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Proyectos } from '../models/proyecto.model';
import { Entregable } from '../models/entegable.model';


@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor(private firestore: Firestore) { }

  buscarProyectos(searchTerm: string, fechaInicio: string, fechaFin: string, estado: string): Observable<Proyectos[]> {
    const ref = collection(this.firestore, 'proyectos');
    let q = query(ref);

    // Agrega filtros condicionalmente
    if (searchTerm) {
      q = query(ref, where('nombre', '>=', searchTerm), where('nombre', '<=', searchTerm + '\uf8ff'));
    }
    if (fechaInicio) {
      q = query(q, where('fechaInicio', '>=', fechaInicio));
    }
    if (fechaFin) {
      q = query(q, where('fechaFin', '<=', fechaFin));
    }
    if (estado) {
      q = query(q, where('estado', '==', estado));
    }

    return collectionData(q, { idField: 'id' }) as Observable<Proyectos[]>;
  }

  buscarEntregables(searchTerm: string, fechaInicio: string, fechaFin: string, estado: string): Observable<Entregable[]> {
    const ref = collection(this.firestore, 'entregables');
    let q = query(ref);
    
    if (searchTerm) {
      q = query(ref, where('nombre', '>=', searchTerm), where('nombre', '<=', searchTerm + '\uf8ff'));
    }
    if (fechaInicio) {
      q = query(q, where('fechaInicio', '>=', fechaInicio));
    }
    if (fechaFin) {
      q = query(q, where('fechaFin', '<=', fechaFin));
    }
    if (estado) {
      q = query(q, where('estado', '==', estado));
    }

    return collectionData(q, { idField: 'id' }) as Observable<Entregable[]>;
  }

  buscar(searchTerm: string, fechaInicio: string, fechaFin: string, estado: string): Observable<any[]> {
    const proyectos$ = this.buscarProyectos(searchTerm, fechaInicio, fechaFin, estado);
    const entregables$ = this.buscarEntregables(searchTerm, fechaInicio, fechaFin, estado);
    
    return combineLatest([proyectos$, entregables$]).pipe(
      map(([proyectos, entregables]) => [...proyectos, ...entregables])
    );
  }
}
