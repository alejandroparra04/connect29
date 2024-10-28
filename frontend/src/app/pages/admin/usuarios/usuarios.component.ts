import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

import { AuthService } from '../../../services/auth.service';

import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { Usuario } from '../../../models/user.model';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [RouterLink, FormsModule, MatIconModule, NavbarComponent, SidebarComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {
  usuarios: any = [];
  usuariosFiltrados: any = [];
  filtroBusqueda: string = '';
  role: string | null = '';
  mostrarModalEditar = false;
  mostrarModalEliminar = false;
  usuarioEditar: any = {
    nombre: '',
    apellido: '',
    correo: '',
    rol: '',
    password: '',

  };
  usuarioEliminar: any = [];

  repeatPassword: string = '';
  passwordFieldType: string = 'password';
  repeatPasswordFieldType: string = 'password';
  passwordMismatch: boolean = false;


  constructor(private readonly router: Router, private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.cargarUsuarios();

  }

  cargarUsuarios() {
    this.authService.getUsers().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.usuariosFiltrados = this.usuarios;
      },
      error: (error) => {
        console.error('Error al cargar los usuarios:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar los usuarios',
          text: 'Ha ocurrido un error al cargar los usuarios, contacte al administrador',
        })
      },
    });
  }

  filtrarUsuarios() {
    const filtro = this.filtroBusqueda.toLowerCase();
    this.usuariosFiltrados = this.usuarios.filter((usuario: { first_name: string; last_name: string; email: string; }) =>
      usuario.first_name.toLowerCase().includes(filtro) ||
      usuario.last_name.toLowerCase().includes(filtro) ||
      usuario.email.toLowerCase().includes(filtro)
    );
  }

  abrirModalEditar(usuario: any): void {
    console.log('Abriendo modal de edición', usuario);
    this.usuarioEditar = {
      id: usuario.id,
      nombre: usuario.first_name,
      apellido: usuario.last_name,
      correo: usuario.email,
      rol: usuario.is_staff ? 'adminstrador' : 'usuario',
      password: '',
    };
    this.mostrarModalEditar = true;
  }


  guardarCambios(): void {
    if (this.usuarioEditar.password && this.usuarioEditar.password !== this.repeatPassword) {
      this.passwordMismatch = true;
      return;
    }

    const payload = {
      id: this.usuarioEditar.id,
      first_name: this.usuarioEditar.nombre,
      last_name: this.usuarioEditar.apellido,
      email: this.usuarioEditar.correo,
      is_staff: this.usuarioEditar.admin,
      password: this.usuarioEditar.password ? this.usuarioEditar.password : undefined, // Solo enviar si se ingresa
    };

    this.authService.actualizarUsuario(payload).subscribe({
      next: () => {
        this.cancelarEdicion();
        this.cargarUsuarios();
        Swal.fire({
          icon: 'success',
          title: 'Usuario actualizado exitosamente',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: (error) => {
        console.error('Error al actualizar el proyecto:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar el usuario',
          text: 'Hubo un problema al actualizar los datos',
        });
      },
    });
  }

  cancelarEdicion(): void {
    this.mostrarModalEditar = false;
    this.usuarioEditar = {
      nombre: '',
      apellido: '',
      correo: '',
      rol: '',
      password: '',
    };
  }

  cancelarEliminacion() {
    this.mostrarModalEliminar = false;
    this.usuarioEliminar = null;
  }

  confirmarEliminacion(): void {
    if (this.usuarioEliminar) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.authService.eliminarUsuario(this.usuarioEliminar.id).subscribe({
            next: () => {
              this.cargarUsuarios();
              this.cancelarEliminacion();
              Swal.fire(
                'Eliminado',
                'El usuario ha sido eliminado.',
                'success'
              );
            },
            error: (error) => {
              console.error('Error al eliminar el usuario:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error al eliminar',
                text: 'Hubo un problema al eliminar el usuario',
              });
            },
          });
        }
      });
    }
  }

  eliminarUsuario(id: number) {
    this.usuarioEliminar = this.usuarios.find((usuario: { id: number; }) => usuario.id === id) || null;
    this.mostrarModalEliminar = true;
  }

  togglePasswordVisibility() {
    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text';
    } else {
      this.passwordFieldType = 'password';
    }
  }


  toggleRepeatPasswordVisibility() {
    if (this.repeatPasswordFieldType === 'password') {
      this.repeatPasswordFieldType = 'text';
    } else {
      this.repeatPasswordFieldType = 'password';
    }
  }
}
