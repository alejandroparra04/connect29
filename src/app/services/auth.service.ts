import { inject, Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, updatePassword, User as FirebaseUser } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private firestore: Firestore) { 
    
  }

  async registrarse(email: string, password: string, nombre:string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
       return userCredential;
      
    } catch (error: any) {
      console.error('Error al crear usuario: ', error);
      throw error; 
    }
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      const userDoc = doc(this.firestore, `usuario/${user.uid}`);
      const userData = await getDoc(userDoc);
      const userRole = userData.data()?.['rol'] || 'Usuario';
      console.log('Rol del usuario:', userRole);
      localStorage.setItem('userRole',  userRole);

      return user;
    } catch (error: any) {
      console.error('Error al iniciar sesión: ', error);
      throw error; 
    }
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  async iniciarConGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      return result;
    } catch (error: any) {
      console.error('Error al iniciar sesión con Google: ', error);
      throw error; 
    }
  }

  async cerrarSesion(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('Sesion cerrada con éxito');
    } catch(error: any) {
      console.error('Error al cerrar sesión: ', error);
      throw error;
    }
    }

  async restablecerContrasena(nuevaContrasena: string) {
    const user: FirebaseUser | null = this.auth.currentUser; 
    if (user) {
      try {
        await updatePassword(user, nuevaContrasena); 
      } catch (error: any) {
        console.error('Error al actualizar la contraseña: ', error);
        throw new Error('Error al actualizar la contraseña: ' + error.message);
      }
    } else {
      throw new Error('No hay usuario autenticado');
    }
  }
}
