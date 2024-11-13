import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  constructor(private router: Router, private authService: AuthService) {}

  // Обработчик для кнопки уведомлений
  goToNotifications() {
    this.router.navigate(['/notification']);  // Переход на страницу уведомлений
  }

  // Обработчик для кнопки выхода
  goToLogin() {
    this.authService.logout(); // Очищаем состояние и перенаправляем на страницу логина
  }
}
