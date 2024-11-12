import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Импортируем FormsModule
import { provideRouter } from '@angular/router';
import { AuthComponent } from './app/auth/auth.component';
import { AppComponent } from './app/app.component';
import { HeaderComponent } from './app/header/header.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: 'login', component: AuthComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ]),
    importProvidersFrom(FormsModule)  // Подключаем FormsModule для работы с ngModel
  ]
}).catch(err => console.error(err));
