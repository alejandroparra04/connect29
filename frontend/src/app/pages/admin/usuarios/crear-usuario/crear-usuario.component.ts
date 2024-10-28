import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [RouterLink, FormsModule, MatIconModule, NavbarComponent, SidebarComponent],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.scss'
})
export class CrearUsuarioComponent {
  usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    admin: false
  };

  repeatPassword: string = '';
  passwordFieldType: string = 'password';
  repeatPasswordFieldType: string = 'password'
  passwordMismatch: boolean = false;

  // constructor (private router: Router, private authService: AuthService, private firestore:  Firestore) { }
  constructor(private readonly router: Router, private readonly authService: AuthService) { }

  irABuscar() {
    this.router.navigate(['/buscar']);
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

  volver(): void {
    this.router.navigate(['/usuarios']);
  }

  irHome(): void {
    this.router.navigate(['/home'])
  }


  async crearUsuario() {

    if (this.usuario.password !== this.repeatPassword) {
      this.passwordMismatch = true;
      return;
    }

    const payload = {
      username: this.usuario.correo.split('@')[0],
      email: this.usuario.correo,
      first_name: this.usuario.nombre,
      last_name: this.usuario.apellido,
      password: this.usuario.password,
      is_staff: !!this.usuario.admin
    };

    this.authService.createUser(payload).subscribe({
      next: (res) => {
        console.log('Usuario creado exitosamente:', res);
        Swal.fire({
          icon: 'success',
          title: 'Usuario creado exitosamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.volver();
      },
      error: (error) => {
        console.error('Error al crear el usuario:', error);
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error al crear el usuario',
          showConfirmButton: false,
          timer: 1500
        })
      },
      complete: () => { }
    });
  }

  registrarse() {

  }
}
