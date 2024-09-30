import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-contrasena',
  standalone: true,
  imports: [RouterLink,MatIconModule],
  templateUrl: './contrasena.component.html',
  styleUrl: './contrasena.component.scss'
})
export class ContrasenaComponent {
  success: boolean =true;

  constructor(private router:Router){}

  volverInicio(){
    this.router.navigate(['/restablecer-contrasena'])
  }

}
