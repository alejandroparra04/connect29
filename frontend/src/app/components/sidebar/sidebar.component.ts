import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

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

  constructor(private readonly authService: AuthService) {
    this.role = this.authService.getRole();
  }

  toggleMenu() {
    this.menuCerrado = !this.menuCerrado;
  }
}
