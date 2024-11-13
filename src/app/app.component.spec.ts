import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ActionComponent } from './action/action.component';
import { NotificationComponent } from './notification/notification.component';
import { FormPatientRecordComponent } from './form-patient-record/form-patient-record.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, AuthComponent, HeaderComponent, ActionComponent, NotificationComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(
    public authService: AuthService,  // Сервис авторизации
    private router: Router  // Роутер для переходов
  ) {}
}
