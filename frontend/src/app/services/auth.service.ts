import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private readonly apiUrl = 'http://localhost:8000';

  constructor(private readonly http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((res: any) => {
          if (res.token) {
            this.setToken(res.token);
            this.setRole(res.role);
            this.setEmail(res.email);
          }
        })
      )
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  setRole(role: string): void {
    localStorage.setItem('auth_role', role);
  }

  getRole(): string | null {
    return localStorage.getItem('auth_role');
  }

  setEmail(email: string): void {
    localStorage.setItem('auth_email', email);
  }

  getEmail(): string | null {
    return localStorage.getItem('auth_email');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_role');
  }

  createUser(data: object): Observable<any> {
    const token = this.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });

    return this.http.post(`${this.apiUrl}/users/`, data, { headers });
  }

  getUsers(): Observable<any> {
    const token = this.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });

    return this.http.get(`${this.apiUrl}/users/`, { headers });
  }

  getUser(id: string): Observable<any> {
    const token = this.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });

    return this.http.get(`${this.apiUrl}/users/${id}/`, { headers });
  }

  actualizarUsuario(usuario: object): Observable<any> {
    const token = this.getToken();
    const usuario_id = (usuario as { id: number })['id'];

    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });

    return this.http.put(`${this.apiUrl}/users/${usuario_id}/`, usuario, { headers });
  }

  eliminarUsuario(id: string): Observable<any> {
    const token = this.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });

    return this.http.delete(`${this.apiUrl}/users/${id}/`, { headers });
  }

  // ---------------------------------------------

  async registrarse(email: string, password: string, nombre: string) {
  }


  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  async iniciarConGoogle() {

  }

  async cerrarSesion(): Promise<void> {
  }

  async restablecerContrasena(nuevaContrasena: string) {
  }
}
