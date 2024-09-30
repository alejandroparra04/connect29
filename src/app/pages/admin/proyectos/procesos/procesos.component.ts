import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-procesos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './procesos.component.html',
  styleUrl: './procesos.component.scss'
})
export class ProcesosComponent {
  
  constructor(private router: Router){ }

  volver(){
    this.router.navigate(['/proyectos']);
  }

  irABuscar(){
    this.router.navigate(['/buscar']);
  }

  ActividadPm(){
    this.router.navigate(['/actividad-pm']);
  }

  ActividadSi(){
    this.router.navigate(['/actividad-si']);
  }

}
