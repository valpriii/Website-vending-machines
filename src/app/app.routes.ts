import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ActionComponent } from './action/action.component';
import { NotificationComponent } from './notification/notification.component';
import { FormPatientRecordComponent } from './form-patient-record/form-patient-record.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthGuard } from './auth.guard';

// Определение маршрутов
export const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'home', component: ActionComponent, canActivate: [AuthGuard] },
  { path: 'notification', component: NotificationComponent, canActivate: [AuthGuard] }, 
  { path: 'form-patient-record', component: FormPatientRecordComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Здесь используется RouterModule для настройки маршрутов
  exports: [RouterModule]  // Экспортируем RouterModule для использования в других компонентах
})
export class AppRoutingModule {

}
