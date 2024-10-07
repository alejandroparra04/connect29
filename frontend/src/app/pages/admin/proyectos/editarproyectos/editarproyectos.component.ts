import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProyectoService } from '../../../../services/proyecto.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';

@Component({
  selector: 'app-editarproyectos',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, MatIconModule, SidebarComponent, NavbarComponent],
  templateUrl: './editarproyectos.component.html',
  styleUrl: './editarproyectos.component.scss'
})
export class EditarproyectosComponent implements OnInit {
  proyecto: any = {};
  id: string = '';
  editForm: FormGroup;

  menuCerrado = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly proyectoService: ProyectoService,
    private readonly router: Router
  ) {
    this.editForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      responsable: ['', Validators.required],
    });
  }

  toggleMenu() {
    this.menuCerrado = !this.menuCerrado;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';

  }

  onSubmit(): void {
    if (this.editForm.valid) {

    }
  }

  guardarCambios(): void {
    if (this.editForm.valid) {

    }

  }

  cancelar(): void {
    this.router.navigate(['/proyectos']);
  }

  volver() {
    this.router.navigate(['proyectos']);
  }

  irABuscar() {
    this.router.navigate(['/buscar']);
  }
}



