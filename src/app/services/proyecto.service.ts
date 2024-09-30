import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, docData, collectionData, docSnapshots, query, where, getDocs } from '@angular/fire/firestore';
import {last, Observable, from} from 'rxjs'
import { Proyectos } from '../models/proyecto.model';
import { getDoc } from 'firebase/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private firestore: Firestore) {}

  obtenerProyectos(): Observable<Proyectos[]> {
    const proyectosCollection = collection(this.firestore, 'proyectos');
    return collectionData(proyectosCollection, { idField: 'id' }) as Observable<Proyectos[]>;

  }

  obtenerProyectoPorId(id: string): Observable<Proyectos | undefined> {
    const proyectoDoc = doc(this.firestore, `proyectos/${id}`);
    return docData(proyectoDoc, { idField: 'id' }) as Observable<Proyectos | undefined>;
 }

 async obtenerSiguienteId(): Promise<number> {
  const contadorDoc = doc(this.firestore, 'counters/proyectos');
  const contadorSnapshot = await getDoc(contadorDoc);
  if (contadorSnapshot.exists()) {
    const data = contadorSnapshot.data();
    const lastId = data?.['lastId'] || 0;
    const nuevoId = lastId + 1;

    await updateDoc(contadorDoc, { lastId: nuevoId });
    return nuevoId;
  } else {
    throw new Error('El contador no existe en Firestore');
  }
}

async crearProyecto(proyecto: Proyectos): Promise<void> {
  try {
    const nuevoId = await this.obtenerSiguienteId();
    const proyectosCollection = collection(this.firestore, 'proyectos');
    const docRef = await addDoc(proyectosCollection, { ...proyecto, id: nuevoId });
    console.log(`Proyecto creado con ID ${nuevoId}`);
  } catch (error) {
    console.error('Error al crear el proyecto', error);
    throw error;
  }
}

  

  actualizarProyecto(id: string, data: any): Observable<void> {
   return new Observable(observer =>{
    const proyectoDoc = doc(this.firestore, `proyectos/${id}`);
      updateDoc(proyectoDoc, data).then(() =>{
      observer.next();
       observer.complete();
     });
    });
  }

  eliminarProyecto(id: string): Promise<void> {
    const proyectoDoc = doc(this.firestore, `proyectos/${id}`);
    return deleteDoc(proyectoDoc);
  }
}
