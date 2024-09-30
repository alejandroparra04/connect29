import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, docData, collectionData, docSnapshots } from '@angular/fire/firestore';
import {last, Observable} from 'rxjs'
import { Entregable } from '../models/entegable.model';
import { getDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class EntregableService {

  constructor(private firestore: Firestore) { }

  ObtenerEntregables():  Observable<Entregable[]> {
    const entregableCollection = collection(this.firestore, 'entregables');
    return collectionData(entregableCollection, { idField: 'id' }) as Observable<Entregable[]>;
  }

  obtenerEntregablePorId(id: string):  Observable<Entregable> {
    const entregableDoc = doc(this.firestore, `entregables/${id}`);
    return docData(entregableDoc, { idField: 'id' }) as Observable<Entregable>;
  }

  async obtenerSiguienteId(): Promise<number> {
    const contadorDoc = doc(this.firestore, 'counters/entregables');
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

  async crearEntregables(entregable: Entregable): Promise<void> {
    try {
      const nuevoId = await this.obtenerSiguienteId();
      const entregableCollection = collection(this.firestore, 'entregables');
      const docRef = await addDoc(entregableCollection, { ...entregable, id: nuevoId });
      console.log(`Entregable creado con ID ${nuevoId}`);
    } catch (error) {
      console.error('Error al crear el entregable', error);
      throw error;
    }
  }

  actualizarEntregable(id: string, data: any): Observable<void> {
    return new Observable(observer =>{
     const entregableDoc = doc(this.firestore, `entregables/${id}`);
       updateDoc(entregableDoc, data).then(() =>{
       observer.next();
        observer.complete();
      });
     });
   }
 
   eliminarEntregable(id: string): Promise<void> {
     const entregableDoc = doc(this.firestore, `entregables/${id}`);
     return deleteDoc(entregableDoc);
   }


}
