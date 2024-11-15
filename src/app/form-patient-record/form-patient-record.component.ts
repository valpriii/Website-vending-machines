import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-patient-record',
  standalone: true,
  imports: [],
  templateUrl: './form-patient-record.component.html',
  styleUrl: './form-patient-record.component.css'
})
export class FormPatientRecordComponent {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/home']); // Переход на главную страницу
  }
}
