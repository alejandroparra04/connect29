import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Proyectos } from '../../../../models/proyecto.model';
import { ProyectoService } from '../../../../services/proyecto.service';
import { AuthService } from '../../../../services/auth.service';
import Swal from 'sweetalert2';

import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';

@Component({
  selector: 'app-crearproyecto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, SidebarComponent, NavbarComponent],
  templateUrl: './crearproyecto.component.html',
  styleUrl: './crearproyecto.component.scss'
})
export class CrearproyectoComponent implements OnInit {
  nuevoProyecto: Proyectos = {
    // numeroId: 1,
    id: 0,
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    responsable: '',
  };

  usuarios: any = [];
  currentUserEmail: string | null = '';


  constructor(private readonly router: Router, private readonly proyectoService: ProyectoService, private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.currentUserEmail = this.authService.getEmail();

    this.authService.getUsers().subscribe(
      (res) => {
        this.usuarios = res;

        const currentUser = this.usuarios.find((user: { email: string | null; }) => user.email === this.currentUserEmail);
        if (currentUser) {
          this.nuevoProyecto.responsable = currentUser.id;
        }
      },
      (error) => {
        console.error('Error al cargar los usuarios:', error);
      }
    );
  }

  volver(): void {
    this.router.navigate(['/proyectos']);
  }

  irHome(): void {
    this.router.navigate(['/home'])
  }

  async guardarNuevoProyecto() {
    const payload = {
      ...this.nuevoProyecto,
    }

    this.proyectoService.crearProyecto(payload).subscribe({
      next: (res) => {
        console.log('Proyecto creado exitosamente:', res);
        Swal.fire({
          icon: 'success',
          title: 'Proyecto creado exitosamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.volver();
      },
      error: (error) => {
        console.error('Error al crear el proyecto:', error);
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error al crear el proyecto',
          showConfirmButton: false,
          timer: 1500
        })
      },
      complete: () => { }
    });
  }

  irABuscar() {
    this.router.navigate(['/buscar']);
  }
}
