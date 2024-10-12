import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, docData, collectionData, docSnapshots } from '@angular/fire/firestore';
import { catchError, last, Observable, throwError } from 'rxjs'
import { Entregable, Deliverable } from '../models/entegable.model';
import { getDoc } from 'firebase/firestore';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EntregableService {

  private readonly apiUrl = 'http://localhost:8000';

  constructor(private readonly authService: AuthService, private readonly http: HttpClient) { }

  ObtenerActividades(categoria: string): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.get(`${this.apiUrl}/activities/${categoria}/`, { headers });
  }

  ObtenerEntregables(proyecto: number, actividad: string): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.get(`${this.apiUrl}/deliverables/${proyecto}/${actividad}/`, { headers });
  }

  crearEntregable(deliverable: Deliverable, proyecto: number, actividad: string): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.post(`${this.apiUrl}/deliverables/${proyecto}/${actividad}/`, deliverable, { headers });
  }

  obtenerEntregablePorId(id: string): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.get(`${this.apiUrl}/deliverables/${id}/`, { headers });
  }

  obtenerSiguienteId(): void {


  }



  actualizarEntregable(entregableEditar: Deliverable): Observable<any> {

    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.put(`${this.apiUrl}/deliverables/${entregableEditar.id}/`, entregableEditar, { headers });

  }

  eliminarEntregable(id: number): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.delete(`${this.apiUrl}/deliverables/${id}/`, { headers });

  }

  subirArchivo(formData: FormData): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });

    return this.http.post(`${this.apiUrl}/subir-archivo/`, formData, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error("Error en la subida del archivo:", error);
        return throwError(() => new Error("Error en la subida del archivo"));
      })
    );
  }



}
