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
    {id: 1, nombre_actividad:  'Inicio de la Implementación del software'},
    {id: 2, nombre_actividad:  'Analisis de requisitos'},
    {id: 3, nombre_actividad:  'Diseño detallado y arquitectura del software'},
    {id: 4, nombre_actividad:  'Construcción del software'},
    {id: 5, nombre_actividad:  'Pruebas e integración del software'},
    {id: 6, nombre_actividad:  'Entrega del producto'},
  ]

  menuCerrado = false;

  constructor (private router: Router){}

  toggleMenu(){
    this.menuCerrado = !this.menuCerrado;
  }

  volver(){
    this.router.navigate(['/procesos']);
  }
  
  irABuscar() {
    this.router.navigate(['/buscar']);
  }

  Entregables(){
    this.router.navigate(['/entregables']);
  }
}
