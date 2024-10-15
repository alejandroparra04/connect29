import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { AcercaDeComponent } from '../acerca-de/acerca-de.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuCerrado = false;
  role: string | null = '';

  constructor(private readonly authService: AuthService, private readonly dialog: MatDialog) {
    this.role = this.authService.getRole();
  }

  toggleMenu() {
    this.menuCerrado = !this.menuCerrado;
  }

  abrirAcercaDe(): void {
    this.dialog.open(AcercaDeComponent, {
      width: '600px' // Tamaño del modal
    });
  }


}
