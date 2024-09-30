import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'  ;
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [RouterLink, FormsModule, MatIconModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.scss'
})
export class InicioSesionComponent {
  user = {
    rol: '',
    correo: '',
    password: ''
  };
  userRole: string | null = '';

  constructor (private router: Router, private authService: AuthService){}

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

  volver(): void{
    this.router.navigate(['/usuarios']);
  }

  async iniciarSesion() {
    try {
      const result = await this.authService.login(this.user.correo, this.user.password);
      console.log('Inicio de sesio´n exitoso: ', result);
      alert('Inicio de sesión exitoso');
      this.router.navigate(['/home']); 
    } catch (error) {
      console.error('Error al iniciar sesión: ', error);
      alert('Error al iniciar sesión. Verifique sus credenciales.');
    }
  }

  async iniciarConGoogle(){
    try {
      await this.authService.iniciarConGoogle();
      alert('Inicio de sesión exitoso con Google');
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error al iniciar sesión con Google:',error);
      alert('Error al iniciar sesión con Google');
    }
  }
}
