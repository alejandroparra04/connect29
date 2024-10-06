import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { BuscarComponent } from "../admin/buscar/buscar.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, BuscarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  role: string | null = '';

  ngOnInit() {
    this.role = this.authService.getRole();
  }

  menuCerrado = false;

  constructor(private readonly router: Router, private readonly authService: AuthService) { }

  toggleMenu() {
    this.menuCerrado = !this.menuCerrado;
  }

  irABuscar() {
    this.router.navigate(['/buscar']);
  }

  irACrearproyecto() {
    this.router.navigate(['/crearproyecto']);
  }

  irACrearUsuario() {
    this.router.navigate(['/crear-usuario']);
  }

  irARoles() {
    this.router.navigate(['/roles']);
  }

  cerrarSesion() {
    this.authService.cerrarSesion().then(() => {
      this.router.navigate(['/iniciar-sesion']);
    }).catch((error) => {
      console.error('Error al cerrar sesión: ', error);
    });
  }

}
