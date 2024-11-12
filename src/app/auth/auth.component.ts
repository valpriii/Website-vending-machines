import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],  // Подключаем FormsModule для работы с ngModel
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  username: string = '';
  password: string = '';

  onSubmit() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }
}
