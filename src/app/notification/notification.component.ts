import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Импортируем CommonModule и DatePipe
import { FirebaseService } from '../services/firebase.service';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru'; // Импортируем русскую локаль
import { LOCALE_ID } from '@angular/core'; // Импортируем LOCALE_ID из @angular/core
import { Router } from '@angular/router';

// Регистрируем локаль
registerLocaleData(localeRu, 'ru');

interface Notification {
  date: Date;
  type: string;
  message: string;
}

@Component({
  selector: 'app-notification',
  standalone: true,
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  imports: [CommonModule],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'ru' }, // Устанавливаем русскую локаль
  ],
})
export class NotificationComponent implements OnInit {
  notifications: { date: string; items: Notification[] }[] = [];

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private datePipe: DatePipe // Внедряем DatePipe
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      console.log('Начинаем загрузку уведомлений...');
      const allNotifications = await this.fetchNotifications();
      console.log(`Получено уведомлений: ${allNotifications.length}`);
      this.organizeNotificationsByDate(allNotifications);
    } catch (error) {
      console.error('Ошибка при загрузке уведомлений:', error);
    }
  }

  private async fetchNotifications(): Promise<Notification[]> {
    const collectionName = 'notification_history';
    try {
      console.log(`Загружаем данные из коллекции: ${collectionName}...`);
      const snapshot = await this.firebaseService.getDocs(collectionName);
      console.log(`Данные получены, количество документов: ${snapshot.length}`);
      
      return snapshot.map((doc: { date: any; type: string; message: string }) => ({
        date: doc.date.toDate(),
        type: doc.type,
        message: doc.message,
      }));
    } catch (error) {
      console.error('Ошибка при получении данных из Firestore:', error);
      throw error;
    }
  }

  private organizeNotificationsByDate(notifications: Notification[]) {
    const sortedNotifications = notifications.sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );

    const groupedByDate: { [key: string]: Notification[] } = {};
    sortedNotifications.forEach((notification) => {
      const dateStr = notification.date.toISOString().split('T')[0]; // Форматируем в yyyy-mm-dd
      if (!groupedByDate[dateStr]) {
        groupedByDate[dateStr] = [];
      }
      groupedByDate[dateStr].push(notification);
    });

    this.notifications = Object.entries(groupedByDate).map(([date, items]) => ({
      date,
      items,
    }));
  }

  getIconPath(type: string): string {
    return type === 'warning'
      ? 'warning_message.svg'
      : 'technical_message.svg';
  }

  formatDate(date: string | Date, isTime: boolean = false): string {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    return this.datePipe.transform(parsedDate, isTime ? 'HH:mm' : 'd MMMM y', 'ru') || '';
  }

  goBack(): void {
    this.router.navigate(['/home']); // Переход на главную страницу
  }

}
