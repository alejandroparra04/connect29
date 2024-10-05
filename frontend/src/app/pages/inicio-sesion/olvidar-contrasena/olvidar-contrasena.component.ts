import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-olvidar-contrasena',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './olvidar-contrasena.component.html',
  styleUrl: './olvidar-contrasena.component.scss'
})
export class OlvidarContrasenaComponent {

  constructor(private router: Router){}

  volver(){
    this.router.navigate(['/inicio-sesion']);
  }

}
