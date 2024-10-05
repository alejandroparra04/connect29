import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-actividad-pm',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './actividad-pm.component.html',
  styleUrl: './actividad-pm.component.scss'
})
export class ActividadPmComponent {
  proyectoId: string;
  actividad = [
    {id: 1, nombre_actividad: 'Planificación del Proyecto'},
    {id: 2, nombre_actividad: 'Ejecución del plan de Proyecto'},
    {id: 3, nombre_actividad: 'Evalución y control del Proyecto'},
    {id: 4, nombre_actividad: 'Cierre del Proyecto'},
  ]

  menuCerrado = false;

  constructor (private route: ActivatedRoute, private router:Router){
    this.proyectoId = this.route.snapshot.paramMap.get('id')!;
  }

  toggleMenu(){
    this.menuCerrado = !this.menuCerrado;
  }
  
  volver(){
    this.router.navigate(['/procesos']);
  }

  irABuscar(){
    this.router.navigate(['/buscar']);
  }

  Entregables(){
    this.router.navigate(['/entregables']);
  }
}
