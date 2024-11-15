import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Подключаем FormsModule для работы с ngModel
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Делаем метод onSubmit асинхронным
  async onSubmit() {
    try {
      // Ждем результат от асинхронного метода login
      const isAuthenticated = await this.authService.login(this.username, this.password);
      
      if (isAuthenticated) {
        alert('Данные введены корректно');
        this.router.navigate(['/home'], { replaceUrl: true });
      } else {
        this.errorMessage = 'Неверные ФИО или пароль. Попробуйте снова.';
        alert(this.errorMessage);
      }
    } catch (error) {
      console.error('Ошибка при выполнении входа:', error);
      this.errorMessage = 'Произошла ошибка при попытке входа. Пожалуйста, попробуйте позже.';
    }
  }
  // Метод для перехода на страницу изменения пароля
    onChangePassword() {
    this.router.navigate(['/change-password'], { replaceUrl: true });
  }
}
