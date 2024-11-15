import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) {}

  // Метод для логина
  login(username: string, password: string): boolean {
    if (username === 'Потапова Валерия Романовна' && password === '89899563191') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  // Метод для логаута
  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['/login']); // Переход на страницу логина
  }

  // Метод для сброса состояния аутентификации
  resetAuth() {
    this.isAuthenticated = false; // Сбрасываем состояние аутентификации
  }

  // Получение состояния авторизации
  getAuthStatus(): boolean {
    return this.isAuthenticated;
  }
}
