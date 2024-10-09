import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, docData, collectionData, docSnapshots } from '@angular/fire/firestore';
import { last, Observable } from 'rxjs'
import { Entregable } from '../models/entegable.model';
import { getDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class EntregableService {

  // constructor(private firestore: Firestore) { }
  constructor() { }

  ObtenerEntregables(): void {

  }

  obtenerEntregablePorId(id: string): void {

  }

  obtenerSiguienteId(): void {


  }

  crearEntregables(entregable: Entregable): void {

  }

  actualizarEntregable(id: string, data: any): void {

  }

  eliminarEntregable(id: string): void {

  }


}
