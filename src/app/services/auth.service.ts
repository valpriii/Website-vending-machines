import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, getDocs, addDoc, doc, setDoc, query, where, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private currentUser: { username: string; password: string } | null = null;

  constructor(private router: Router, private firestore: Firestore) {
    // Инициализация данных при создании сервиса
    this.initializeLoginData();
  }

  // Инициализация коллекции, если она отсутствует
  private async initializeLoginData() {
    const collRef = collection(this.firestore, 'login_password_vending');
    const snapshot = await getDocs(collRef);

    if (snapshot.empty) {
      // Если коллекция пуста, добавляем начальный документ
      await addDoc(collRef, {
        username: 'Потапова Валерия Романовна',
        password: '89899563191',
      });
      console.log('login_password_vending collection created with initial data');
    } else {
      console.log('login_password_vending collection already exists');
    }
  }

  // Метод для логина
  async login(username: string, password: string): Promise<boolean> {
    const collRef = collection(this.firestore, 'login_password_vending');
    const q = query(collRef, where('username', '==', username), where('password', '==', password));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      // Если найден подходящий документ, авторизация успешна
      this.isAuthenticated = true;
      this.currentUser = { username, password };
      console.log(`User ${username} authenticated successfully.`);
      return true;
    } else {
      // Неверное имя пользователя или пароль
      console.warn('Invalid username or password.');
      return false;
    }
  }

  // Метод для изменения пароля пользователя
  async changePassword(username: string, currentPassword: string, newPassword: string): Promise<boolean> {
    const collRef = collection(this.firestore, 'login_password_vending');
    const q = query(collRef, where('username', '==', username), where('password', '==', currentPassword));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.warn('User not found or current password is incorrect.');
      return false;
    }

    // Изменение пароля
    const userDoc = snapshot.docs[0];
    const userRef = doc(this.firestore, 'login_password_vending', userDoc.id);
    await updateDoc(userRef, { password: newPassword });
    console.log(`Password for user ${username} updated successfully.`);

    // Устанавливаем пользователя как аутентифицированного с новым паролем
    this.setAuth(username, newPassword);
    return true;
  }

  // Метод для логаута
  logout() {
    this.isAuthenticated = false;
    this.currentUser = null;
    this.router.navigate(['/login'], { replaceUrl: true }); // Переход на страницу логина
    console.log('User logged out.');
  }

  // Метод для сброса состояния аутентификации
  resetAuth() {
    this.isAuthenticated = false;
    this.currentUser = null;
    console.log('Authentication reset.');
  }

  // Метод для установки авторизованного пользователя
  setAuth(username: string, password: string) {
    this.isAuthenticated = true;
    this.currentUser = { username, password };
    console.log(`User ${username} set as authenticated.`);
  }

  // Получение состояния авторизации
  getAuthStatus(): boolean {
    return this.isAuthenticated;
  }

  // Получение текущего авторизованного пользователя
  getCurrentUser(): { username: string; password: string } | null {
    return this.currentUser;
  }
}
