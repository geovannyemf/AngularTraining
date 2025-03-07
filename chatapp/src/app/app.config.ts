import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: "sample-firebase-ai-app-833c5",
        appId: "1:536798911577:web:bb9b43e3b91cf99c7e2548",
        storageBucket: "sample-firebase-ai-app-833c5.firebasestorage.app",
        apiKey: "AIzaSyAfi7STO0tnmRf0vEUouPOOJp2VVw0CtRQ",
        authDomain: "sample-firebase-ai-app-833c5.firebaseapp.com",
        messagingSenderId: "536798911577",
      })
    ),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
};
