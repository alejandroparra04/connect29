import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  role: string | null = '';

  constructor(private readonly router: Router, private readonly authService: AuthService) {
    this.role = this.authService.getRole();
  }

  irABuscar() {
    this.router.navigate(['/buscar']);
  }
}
