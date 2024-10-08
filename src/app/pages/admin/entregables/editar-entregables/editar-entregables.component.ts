import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { EntregableService } from '../../../../services/entregable.service';

@Component({
  selector: 'app-editar-entregables',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './editar-entregables.component.html',
  styleUrl: './editar-entregables.component.scss'
})
export class EditarEntregablesComponent implements  OnInit {
  entregable: any = {};
  id: string = '';
  editForm: FormGroup;
  entregableId!: number;

  menuCerrado = false;

  constructor(private fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute,
    private entregableService: EntregableService) { 
    this.editForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
      fecha: ['', Validators.required]
    });
  }

  toggleMenu(){
    this.menuCerrado = !this.menuCerrado;
  }

  ngOnInit(): void{
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.entregableService.obtenerEntregablePorId(this.id).subscribe(entregable => {
        if (entregable) {
          this.editForm.patchValue({
            nombre: entregable.nombre,
            descripcion: entregable.descripcion,
            estado: entregable.estado,
            fecha: entregable.fecha
          });
        }
      });
    }
  }

  onSubmit(): void {
    if(this.editForm.valid){
      this.entregableService.actualizarEntregable(this.id, this.editForm.value).subscribe(() => {
        this.router.navigate(['/entregables']);
      });
    }
  }

  guardarCambios() {
    if (this.editForm.valid) {
      this.entregableService.actualizarEntregable(this.id, this.editForm.value).subscribe(() => {
        alert('Entregable actualizado con éxito');
        this.router.navigate(['/entregables']);
      }, (error) => {
        console.error('Error al actualizar el entregable', error);
      });
    } else {
      console.log('El formulario no es válido')
    }
  }

  cancelarEdicion() {
    this.router.navigate(['/entregables']); 
  }

  volver() {
    this.router.navigate(['entregables']);
  }

  irABuscar(){
    this.router.navigate(['/buscar']);
  }

}
