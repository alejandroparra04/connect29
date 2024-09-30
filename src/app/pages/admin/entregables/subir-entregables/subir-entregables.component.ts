import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-subir-entregables',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './subir-entregables.component.html',
  styleUrl: './subir-entregables.component.scss'
})
export class SubirEntregablesComponent {

  constructor (private router: Router){}

  home(){
    this.router.navigate(['/home']);
  }

  volver(){
    this.router.navigate(['/entregables'])
  }
  irABuscar(){
    this.router.navigate(['/buscar'])
  }

}
