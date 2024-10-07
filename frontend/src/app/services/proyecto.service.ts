import { Injectable } from '@angular/core';
import { Proyectos } from '../models/proyecto.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  // constructor(private firestore: Firestore) { }
  private readonly apiUrl = 'http://localhost:8000';

  constructor(private readonly http: HttpClient, private readonly authService: AuthService) { }

  obtenerProyectos(): void {

  }

  obtenerProyectoPorId(id: string): void {

  }

  obtenerSiguienteId(): void {

  }

  crearProyecto(proyecto: Proyectos): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });

    return this.http.post(`${this.apiUrl}/projects/`, proyecto, { headers });
  }



  actualizarProyecto(id: string, data: any): void {

  }

  eliminarProyecto(id: string): void {

  }
}
