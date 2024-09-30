import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Entregable } from '../../../../models/entegable.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EntregableService } from '../../../../services/entregable.service';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.scss'
})
export class DetallesComponent {
  entregable: any = {
    numberId: 0,
    nombre:'',
     descripcion:'',
    fecha:'',
  };


  constructor(private route: ActivatedRoute, private router: Router, private entregableService: EntregableService){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.entregableService.obtenerEntregablePorId(id). subscribe(entregable => {
        this.entregable = entregable;
       }, error =>{
        console.log('Error al obtener los detalles del entregable:',error);
       });
    }
  }

  volver(): void{
    this.router.navigate(['/entregables']);
  }

  irHome(): void{
    this.router.navigate(['/home'])
  }

  cerrarDetalles() {
    this.router.navigate(['/entregables']); 
  }

  irABuscar(){
    this.router.navigate(['/buscar']);
  }

}
