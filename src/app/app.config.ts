import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"recetario-51e47","appId":"1:592552160173:web:0b8ec094f40406f2cc8f24","storageBucket":"recetario-51e47.appspot.com","apiKey":"AIzaSyAUSezMcRq9Rdl5_RX_rpeF5sNw2rC72bA","authDomain":"recetario-51e47.firebaseapp.com","messagingSenderId":"592552160173","measurementId":"G-5N8YC7XZ9B"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
