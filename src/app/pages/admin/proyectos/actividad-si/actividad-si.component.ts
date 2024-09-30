import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-actividad-si',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './actividad-si.component.html',
  styleUrl: './actividad-si.component.scss'
})
export class ActividadSiComponent {
  actividad_si = [
    {id: 1, nombre_actividad:  'Actividad 1'},
    {id: 1, nombre_actividad:  'Actividad 1'},
    {id: 1, nombre_actividad:  'Actividad 1'},
    {id: 1, nombre_actividad:  'Actividad 1'},
    {id: 1, nombre_actividad:  'Actividad 1'},
    {id: 1, nombre_actividad:  'Actividad 1'},
  ]

  constructor (private router: Router){}

  irABuscar() {
    this.router.navigate(['/buscar']);
  }

  Entregables(){
    this.router.navigate(['/entregables']);
  }
}
