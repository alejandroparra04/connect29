import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BusquedaService } from '../../../services/busqueda.service';


@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [CommonModule, FormsModule, ],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.scss'
})
export class BuscarComponent {
  searchTerm: string = '';
  fecha_inicio: string = '';
  fecha_fin: string = '';
  estado: string = '';
  categoriaProyectos: boolean = false;
  categoriaEntregables: boolean = false;
  resultados: any[] = [];

  constructor(private router: Router, private busquedaService: BusquedaService) {}

  buscar(){
    this.busquedaService.buscar(this.searchTerm, this.fecha_inicio, this.fecha_fin, this.estado).subscribe(resultados => {
      console.log(resultados);
      this.resultados = resultados;
    }, error => {
      console.error('Error al buscar: ', error);
    });
   
  }

  irHome() {
    this.router.navigate(['/home']);
  }

  volver() {
    this.router.navigate(['/entregables']);
  }

}
