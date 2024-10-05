import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProyectoService } from '../../../../services/proyecto.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-editarproyectos',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './editarproyectos.component.html',
  styleUrl: './editarproyectos.component.scss'
})
export class EditarproyectosComponent implements OnInit {
  proyecto: any = {};
  id: string = '';
  editForm: FormGroup;

  menuCerrado = false;

  constructor( private fb: FormBuilder,
    private route: ActivatedRoute, 
    private proyectoService: ProyectoService,
    private router: Router ){
      this.editForm = this.fb.group({
        nombre: ['', Validators.required],
        descripcion: [''],
        fecha_inicio: ['', Validators.required],
        fecha_fin: ['', Validators.required],
        responsable: ['', Validators.required],
      });
    }

    toggleMenu(){
      this.menuCerrado = !this.menuCerrado;
    }
    
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.proyectoService.obtenerProyectoPorId(this.id).subscribe(proyecto => {
      if  (proyecto) {
         this.editForm.patchValue({
          nombre: proyecto.nombre,
          descripcion: proyecto.descripcion,
          fecha_inicio: proyecto.fecha_inicio,
          fecha_fin: proyecto.fecha_fin,
          responsable: proyecto.responsable,
        });
      }
      });

    }
  }

  onSubmit(): void {
    if(this.editForm.valid){
      this.proyectoService.actualizarProyecto(this.id, this.editForm.value).subscribe(() => {
        this.router.navigate(['/proyectos']);
      });
    }
  }

  guardarCambios(): void {
    if (this.editForm.valid){
      this.proyectoService.actualizarProyecto(this.id, this.editForm.value).subscribe(() => {
        alert('Proyecto actualizado con éxito');
         this.router.navigate(['/proyectos']);
     }, (error) => {
      console.error('Error al actualizar el proyecto', error);
     });
    } else {
      console.log('Formulario no es válido')
    }
  }

  cancelar(): void {
    this.router.navigate(['/proyectos']);
  }

  volver() {
    this.router.navigate(['proyectos']);
  }

  irABuscar(){
    this.router.navigate(['/buscar']);
  }
}


