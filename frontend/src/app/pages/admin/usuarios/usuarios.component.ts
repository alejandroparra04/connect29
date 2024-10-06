import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

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
    correo: '',
    password: '',
  };

  menuCerrado = false;

  // constructor (private router: Router, private authService: AuthService, private firestore:  Firestore) { }
  constructor(private readonly router: Router, private readonly authService: AuthService) { }

  toggleMenu() {
    this.menuCerrado = !this.menuCerrado;
  }

  irABuscar() {
    this.router.navigate(['/buscar']);
  }

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

  registrarse() {
    this.authService.registrarse(this.usuario.correo, this.usuario.password, this.usuario.nombre).then(() => {
      alert('Usuario creado con éxito ');
      this.router.navigate(['/inicio-sesion']);
    }).catch(error => {
      console.error('Error al crear el usuario: ', error);
      alert('Error al crear el usuario');
    });
  }

  volver(): void {
    this.router.navigate(['/home']);
  }

  irHome(): void {
    this.router.navigate(['/home'])
  }

  async crearUsuario() {

    // try {
    //   if (this.usuario.nombre && this.usuario.correo && this.usuario.password) {
    //     const usuarioCollection = collection(this.firestore, 'usuario');
    //     await addDoc(usuarioCollection, this.usuario);
    //     console.log('Usuario creado con exito')
    //     alert('Usuario creado con éxito.');

    //     this.usuario = { nombre: '', correo: '', password: '' };
    //   } else {
    //     console.error('Por favor, complete todos los campos.');
    //   }
    // } catch (error) {
    //   console.error('Error al crear el usuario: ', error);
    // }
  }
}
