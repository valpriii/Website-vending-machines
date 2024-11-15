import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-action',
  standalone: true,
  imports: [],
  templateUrl: './action.component.html',
  styleUrl: './action.component.css'
})
export class ActionComponent {
  constructor(private router: Router) {}

  navigateToPatientRecord(): void {
    this.router.navigate(['/form-patient-record']);
  }
}
