# Chatapp

Firebase Configuration in App Config require import from @angular/fire/ not fire/firebase. Reference error " NullInjectorError: No provider for Firestore."
´´´
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
        initializeApp({"projectId":"sample-firebase-ai",
          "appId":"...",
          "storageBucket":"sample-firebase-ai...",
          "apiKey":"...",
          "authDomain":"sample-firebase-ai...",
          "messagingSenderId":"..."})),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],

};
´´´
Rules configuration could do from firebaseconsole, we got message error 
"FirebaseError: Missing or insufficient permissions"

´´´
service cloud.firestore {
  match /databases/{database}/documents/{document=**} {
    allow read, write: if true;
  }
}
´´´

# Colletion Data from Firebase 
Solution for SDK imcompability and manage the transformation to a custom collection 
´´´
onSnapshot(q, (querySnapshot) => {
  const messages: Message[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data() as Omit<Message, 'id'>;
    messages.push({
      id: doc.id,
      ...data
    });
  });
  this.messages = messages;
});
´´´

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
