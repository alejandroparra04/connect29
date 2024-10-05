import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { finalize, Observable } from 'rxjs';

@Component({
  selector: 'app-subir-entregables',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './subir-entregables.component.html',
  styleUrl: './subir-entregables.component.scss'
})
export class SubirEntregablesComponent {
  nombreEntregable: string = '';
  nombreProyecto: string = '';
  responsable: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  descripcion: string = '';

  menuCerrado = false;

  file: File | null = null;
  uploadProgress: Observable<number> | null = null;
  downloadURL: string | null = null;

  constructor(private router: Router, private firestore: Firestore, private storage: Storage) { }

  onFileSelect(event: any) {
    this.file = event.target.files[0];
  }

  onSubmit() {
    if (this.file) {
      // const filePath  = entregables/${this.file.name};
      const filePath = `entregables/${this.file.name}`;

      const storageRef = ref(this.storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, this.file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Subida está en ' + progress + '%');
        }, (error) => {
          console.error('Error al subir archivo:', error);
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('Archivo subido con éxito, URL:', downloadURL);
            this.saveFileData(this.file!.name, downloadURL);
          });
        }
      );
    }
  }

  saveFileData(nombreArchivo: string, urlArchivo: string) {
    const entregableData = {
      nombreEntregable: this.nombreEntregable,
      nombreActividad: this.nombreProyecto,
      responsable: this.responsable,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      descripcion: this.descripcion,
      urlDocumento: urlArchivo,
      estado: '',
      fechaSubida: new Date(),
    };


    addDoc(collection(this.firestore, 'entregables'), entregableData).then(() => {
      console.log('Entregable guardado correctamente');
    }).catch((error) => {
      console.error('Error al guardar el entregable:', error);
    });
  }

  toggleMenu() {
    this.menuCerrado = !this.menuCerrado;
  }

  home() {
    this.router.navigate(['/home']);
  }

  volver() {
    this.router.navigate(['/entregables'])
  }
  irABuscar() {
    this.router.navigate(['/buscar'])
  }

}
