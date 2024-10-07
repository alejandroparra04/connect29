import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [RouterLink, FormsModule, MatIconModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
  };

  repeatPassword: string = '';
  passwordFieldType: string = 'password';
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
      password: this.usuario.password
    };

    this.authService.createUser(payload).subscribe({
      next: (res) => {
        console.log('Usuario creado exitosamente:', res);
        alert('Usuario creado exitosamente');
        this.irHome();
      },
      error: (error) => {
        console.error('Error al crear el usuario:', error);
        alert('Hubo un error al crear el usuario');
      },
      complete: () => { }
    });
  }

  registrarse() {

  }
}
