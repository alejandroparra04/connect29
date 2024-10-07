import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProyectoService } from '../../../../services/proyecto.service';
import { Proyectos } from '../../../../models/proyecto.model';

@Component({
  selector: 'app-detallesproyecto',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detallesproyecto.component.html',
  styleUrl: './detallesproyecto.component.scss'
})
export class DetallesproyectoComponent implements OnInit {
  proyecto: any = {
    numberId: 0,
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    responsable: ''
  };

  menuCerrado = false;

  constructor(private route: ActivatedRoute, private proyectoService: ProyectoService, private router: Router) { }

  toggleMenu() {
    this.menuCerrado = !this.menuCerrado;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    //  if (id) {
    //    this.proyectoService.obtenerProyectoPorId(id). subscribe(proyecto => {
    //     this.proyecto = proyecto;
    //    }, error =>{
    //     console.log('Error al obtener los detalles del proyecto:',error);
    //    });
    // }
  }

  volver(): void {
    this.router.navigate(['/proyectos']);
  }

  irHome(): void {
    this.router.navigate(['/home'])
  }

  cerrar(): void {
    this.router.navigate(['/proyectos']);
  }

  irABuscar() {
    this.router.navigate(['/buscar']);
  }

}
