import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app/app.routes';
import { enableProdMode } from '@angular/core';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';

import { AppComponent } from './app/app.component';
import { AuthComponent } from './app/auth/auth.component';
import { HeaderComponent } from './app/header/header.component';
import { FooterComponent } from './app/footer/footer.component';
import { ActionComponent } from './app/action/action.component';
import { AuthService } from './app/services/auth.service';
import { NotificationComponent } from './app/notification/notification.component';  

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: 'login', component: AuthComponent },  // Страница авторизации
      { path: 'home', component: ActionComponent },  // Главная страница
      { path: 'notification', component: NotificationComponent },  // Страница уведомлений
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ]),
    importProvidersFrom(FormsModule),
    AuthService,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), // Подключение Firebase
    provideFirestore(() => getFirestore()), // Подключение Firestore
    importProvidersFrom(AppRoutingModule)
  ]
}).catch(err => console.error(err));