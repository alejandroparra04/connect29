import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-restablecer-contrasena',
  standalone: true,
  imports: [RouterLink, FormsModule, MatIconModule],
  templateUrl: './restablecer-contrasena.component.html',
  styleUrl: './restablecer-contrasena.component.scss'
})
export class RestablecerContrasenaComponent {
  user = {
    email: '',
    password:'',
    confirmPassword: ''
  };

  constructor(private router: Router, private authService: AuthService){}

  passwordFieldType: string = 'password';
  passwordIcon: string = 'visibility';

  togglePasswordVisibility() {
    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text';
      this.passwordIcon = 'visibility_off';
    } else {
      this.passwordFieldType = 'password';
      this.passwordIcon = 'visibility'; 
    }
  }

  volver(){
    this.router.navigate(['/inicio-sesion'])
  }

  async restablecerContrasena() {
    if (this.user.password !== this.user.confirmPassword) {
      alert('Las contraseñas  no coinciden. Por favor, intente nuevamente.');
      return;
    }
    try {
      await this.authService.restablecerContrasena(this.user.password);
      alert('Contraseña restablecida con éxito.');
      this.volver();
    } catch (error) {
      console.error('Error al restablecer la contraseña: ', error);
      alert('Hubo un error al restablecer la contraseña. Por favor, intente nuevamente.');
    }
  }
}
