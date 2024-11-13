import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ActionComponent } from './action/action.component'; // Пример еще одного компонента маршрута
import { NotificationComponent } from './notification/notification.component'; // Пример компонента уведомлений

// Определение маршрутов
export const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'home', component: ActionComponent }, // Маршрут для главной страницы
  { path: 'notification', component: NotificationComponent }, // Маршрут для уведомлений
  { path: '', redirectTo: 'login', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Здесь используется RouterModule для настройки маршрутов
  exports: [RouterModule]  // Экспортируем RouterModule для использования в других компонентах
})
export class AppRoutingModule {

}
