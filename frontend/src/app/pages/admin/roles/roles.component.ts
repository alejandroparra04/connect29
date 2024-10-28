import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Firestore, collection, addDoc, getDocs, updateDoc, setDoc } from '@angular/fire/firestore';
import { doc } from 'firebase/firestore';

import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [RouterLink, FormsModule, MatIconModule, SidebarComponent, NavbarComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent {
  rol = {
    correo: '',
    Nom_Usuario: '',
    Asignacion: ''
  };

  menuCerrado = false;

  constructor(private router: Router, private firestore: Firestore) { }

  toggleMenu() {
    this.menuCerrado = !this.menuCerrado;
  }

  irABuscar() {
    this.router.navigate(['/buscar']);
  }

  volver(): void {
    this.router.navigate(['/home']);
  }

  irHome(): void {
    this.router.navigate(['/home'])
  }

  // async crearRol(){
  //   try{
  //     if(this.rol.correo && this.rol.Nom_Usuario && this.rol.Asignacion) {
  //        const rolesCollection = collection(this.firestore, 'roles');
  //        await addDoc(rolesCollection, this.rol);
  //       console.log('Rol creado con éxito:  ', this.rol);
  //       alert('Rol creado con éxito.');

  //       this.rol = {correo: '',  Nom_Usuario: '', Asignacion: ''}
  //     } else {
  //       console.error('Por favor, complete todos los campos.');
  //     }
  //   } catch (error) {
  //     console.error('Error al crear rol:  ', error);

  //   }
  // }

  async crearRol() {
    try {
      if (this.rol.correo && this.rol.Nom_Usuario && this.rol.Asignacion) {
        const rolesCollection = collection(this.firestore, 'roles');
        await addDoc(rolesCollection, this.rol);

        const usuariosRef = collection(this.firestore, 'usuario');
        const querySnapshot = await getDocs(usuariosRef);


        querySnapshot.forEach(async (doc) => {
          const usuarioData = doc.data();
          if (usuarioData['correo'] === this.rol.correo) {
            const userDocRef = doc.ref;
            await updateDoc(userDocRef, { rol: this.rol.Asignacion });
            console.log(`Rol del usuario ${this.rol.correo} actualizado a ${this.rol.Asignacion}`);
          }
        });

        alert('Rol creado y usuario actualizado con éxito.');

        this.rol = { correo: '', Nom_Usuario: '', Asignacion: '' };
      } else {
        console.error('Por favor, complete todos los campos.');
      }
    } catch (error) {
      console.error('Error al crear rol: ', error);
    }
  }

  async asignarRol(uid: string, rol: string) {
    const userDoc = doc(this.firestore, `usuario/${uid}`);
    await setDoc(userDoc, { rol }, { merge: true });

  }


}
