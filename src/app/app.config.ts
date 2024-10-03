import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth} from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import {provideStorage,  getStorage} from '@angular/fire/storage';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyDpETIGcV-qjMXZA10J7tvUsFhWuTsHYGM",
      authDomain: "angulariso29110.firebaseapp.com",
      projectId: "angulariso29110",
      storageBucket: "angulariso29110.appspot.com",
      messagingSenderId: "599825997389",
      appId: "1:599825997389:web:d16198debea654c60b8604",
      measurementId: "G-QW2S9RKPP1"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ]
};
