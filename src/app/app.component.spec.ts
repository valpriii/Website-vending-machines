import { Component } from '@angular/core';
import { AuthComponent } from './auth/auth.component';  // Импортируем компонент AuthComponent
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ActionComponent } from './action/action.component';
import { FormPatientRecordComponent } from './form-patient-record/form-patient-record.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AuthComponent, HeaderComponent, FooterComponent, ActionComponent, FormPatientRecordComponent],  // Добавляем AuthComponent в imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: string = 'Login Page';  // Добавляем свойство title
}
