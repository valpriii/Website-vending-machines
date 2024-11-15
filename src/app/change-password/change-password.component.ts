import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  username: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService, // Инжектируем AuthService
    private router: Router
  ) {}

  async onSubmit(event: Event) {
    event.preventDefault(); // Предотвращаем обновление страницы

    // Проверка совпадения нового пароля и подтверждения
    if (this.newPassword !== this.confirmNewPassword) {
      alert('Новый пароль и подтверждение нового пароля не совпадают, проверьте правильность введенных данных');
      return;
    }

    try {
      // Получение всех данных из коллекции
      const users = await this.firebaseService.getCollectionData('login_password_vending');

      // Поиск пользователя с указанным ФИО и текущим паролем
      const userDoc = users.find(
        (user: any) => user.username === this.username && user.password === this.currentPassword
      );

      if (!userDoc) {
        alert('Такого пользователя не обнаружено, проверьте правильность введенных данных');
        return;
      }

      // Изменение пароля в базе данных
      await this.firebaseService.updateDocument('login_password_vending', userDoc.id, {
        password: this.newPassword,
      });

      // Устанавливаем пользователя как аутентифицированного в AuthService
      this.authService.setAuth(this.username, this.newPassword);

      alert('Пароль успешно изменен!');

      // Перенаправление на домашнюю страницу
      this.router.navigate(['/home'], { replaceUrl: true });
    } catch (error) {
      console.error('Ошибка при изменении пароля:', error);
      alert('Произошла ошибка при изменении пароля. Попробуйте позже.');
    }
  }

  goBack(): void {
    this.router.navigate(['/login'], { replaceUrl: true }); // Переход на главную страницу
  }
}
