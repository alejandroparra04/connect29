import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [RouterLink, FormsModule, MatIconModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.scss'
})
export class InicioSesionComponent {
  user = {
    correo: '',
    password: ''
  };
  userRole: string | null = '';

  constructor(private readonly router: Router, private readonly authService: AuthService) { }

  passwordFieldType: string = 'password';
  passwordIcon: string = 'visility';

  togglePasswordVisibility() {
    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text';
      this.passwordIcon = 'visility_off';
    } else {
      this.passwordFieldType = 'password';
      this.passwordIcon = 'visility';
    }
  }

  volver(): void {
    this.router.navigate(['/usuarios']);
  }

  iniciarSesion(): void {
    this.authService.login(this.user.correo, this.user.password).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso', response.role);
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error al iniciar sesión: ', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: 'Verifique sus credenciales',
          showConfirmButton: true
        });
      }
    });
  }
}
