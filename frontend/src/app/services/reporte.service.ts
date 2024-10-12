import { Injectable } from '@angular/core';
// import { Firestore, collectionData, collection, query, where } from '@angular/fire/firestore';
import { Observable, combineLatest, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Entregable, Deliverable } from '../models/entegable.model';
import { Proyectos } from '../models/proyecto.model';

import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private readonly apiUrl = 'http://localhost:8000'

  // constructor(private firestore: Firestore) { }
  constructor(private readonly authService: AuthService, private readonly http: HttpClient) { }

  getReporte(proyecto: number, proceso: string): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });

    return this.http.get(`${this.apiUrl}/deliverables/${proyecto}/${proceso}/`, { headers });
  }

  // getReporte(fechaInicio: Date, fechaFin: Date, estado?: string): Observable<{
  //   entregables: Entregable[], proyectos: Proyectos[] }> {
  //   // Consulta para entregables
  //   const entregablesCollection = collection(this.firestore, 'entregables');
  //   let entregablesQuery;
  //   if (estado) {
  //     entregablesQuery = query(
  //       entregablesCollection,
  //       where('fecha', '>=', fechaInicio.toISOString()),
  //       where('fecha', '<=', fechaFin.toISOString()),
  //       where('estado', '==', estado)
  //     );
  //   } else {
  //     entregablesQuery = query(
  //       entregablesCollection,
  //       where('fecha', '>=', fechaInicio.toISOString()),
  //       where('fecha', '<=', fechaFin.toISOString())
  //     );
  //   }

  //   const entregables$ = collectionData(entregablesQuery, { idField: 'id' }) as Observable<Entregable[]>;

  //   // Consulta para proyectos
  //   const proyectosCollection = collection(this.firestore, 'proyectos');
  //   const proyectosQuery = query(
  //     proyectosCollection,
  //     where('fecha_inicio', '>=', fechaInicio.toISOString()),
  //     where('fecha_fin', '<=', fechaFin.toISOString())
  //   );
  //   const proyectos$ = collectionData(proyectosQuery, { idField: 'id' }) as Observable<Proyectos[]>;

  //   return combineLatest([entregables$, proyectos$]).pipe(
  //     map(([entregables, proyectos]) => {

  //       proyectos.forEach(proyecto => {
  //         const entregablesDelProyecto = entregables.filter(entregable => {
  //           return entregable.nombre.includes(proyecto.nombre);
  //         });

  //         const completados = entregablesDelProyecto.filter(e => e.estado === 'completado').length;
  //         const totalEntregables = entregablesDelProyecto.length;


  //         // proyecto['completados'] = completados;
  //         // proyecto['totalEntregables'] = totalEntregables;
  //       });

  //       return { entregables, proyectos };
  //     }),
  //     catchError(error => {
  //       console.error('Error obteniendo el reporte: ', error);
  //       return of({ entregables: [], proyectos: [] });
  //     })
  //   );
  // }
}

