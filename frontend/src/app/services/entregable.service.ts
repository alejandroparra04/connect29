import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, docData, collectionData, docSnapshots } from '@angular/fire/firestore';
import { last, Observable } from 'rxjs'
import { Entregable } from '../models/entegable.model';
import { getDoc } from 'firebase/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  ObtenerEntregables(): void {

  }

  obtenerEntregablePorId(id: string): void {

  }

  obtenerSiguienteId(): void {


  }

  crearEntregables(entregable: Entregable): void {

  }

  actualizarEntregable(id: string, data: any): void {

  }

  eliminarEntregable(id: string): void {

  }


}
