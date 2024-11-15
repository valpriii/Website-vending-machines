import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getAuthStatus()) {
      return true; // Доступ разрешен
    } else {
      this.router.navigate(['/login'], { replaceUrl: true });// Перенаправление на страницу входа
      return false; // Доступ запрещен
    }
  }
}
