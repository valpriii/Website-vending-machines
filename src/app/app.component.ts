import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthComponent } from './auth/auth.component';  // Импортируем AuthComponent
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AuthComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Добавляем CUSTOM_ELEMENTS_SCHEMA
})
export class AppComponent {
  
}
