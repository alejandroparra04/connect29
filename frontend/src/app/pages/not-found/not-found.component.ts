import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  goHome(): void {
    window.location.href = '/home';  // Redirige al home, pero si no esta logueado redirige al login
  }
}
