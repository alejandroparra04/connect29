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

  obtenerProyectos(): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });

    return this.http.get(`${this.apiUrl}/projects/`, { headers });
  }

  obtenerProyectoPorId(id: number): Observable<any> {

    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.get(`${this.apiUrl}/projects/${id}/`, { headers });
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



  actualizarProyecto(proyectoEditado: Proyectos): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.put(`${this.apiUrl}/projects/${proyectoEditado.id}/`, proyectoEditado, { headers });
  }

  eliminarProyecto(id: string): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.delete(`${this.apiUrl}/projects/${id}/`, { headers });
  }
}
