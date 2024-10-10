import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProyectoService } from '../../../../services/proyecto.service';
import { AuthService } from '../../../../services/auth.service';
import { FormsModule } from '@angular/forms';

import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';

@Component({
  selector: 'app-detallesproyecto',
  standalone: true,
  imports: [RouterLink, SidebarComponent, NavbarComponent, FormsModule],
  templateUrl: './detallesproyecto.component.html',
  styleUrl: './detallesproyecto.component.scss'
})
export class DetallesproyectoComponent implements OnInit {

  proyecto: any = {
    numberId: 0,
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    responsable: ''
  };

  menuCerrado = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly proyectoService: ProyectoService,
    private readonly authService: AuthService,
    private readonly router: Router) { }

  toggleMenu() {
    this.menuCerrado = !this.menuCerrado;
  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    if (id) {
      this.proyectoService.obtenerProyectoPorId(id).subscribe({
        next: (proyecto) => {
          this.proyecto = proyecto;
          this.obtenerUsuarioPorId(this.proyecto.responsable_id);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  obtenerUsuarioPorId(id: string): void {
    this.authService.getUser(id).subscribe({
      next: (usuario) => {
        this.proyecto.responsable_id = usuario.nombre;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  volver(): void {
    this.router.navigate(['/proyectos']);
  }

  irHome(): void {
    this.router.navigate(['/home'])
  }

  cerrar(): void {
    this.router.navigate(['/proyectos']);
  }

  irABuscar() {
    this.router.navigate(['/buscar']);
  }

}
