import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-acerca-de',
  standalone: true,
  imports: [],
  templateUrl: './acerca-de.component.html',
  styleUrl: './acerca-de.component.scss'
})
export class AcercaDeComponent {
  constructor(private readonly dialog: MatDialog) { }
  cerrarAcercaDe(): void {
    this.dialog.closeAll();
  }
}
