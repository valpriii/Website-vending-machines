import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { FormsModule } from '@angular/forms';    // Import FormsModule

@Component({
  selector: 'app-action',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Include both CommonModule and FormsModule in imports
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent {
  actions = [
    { label: 'Записать пациента', icon: 'record_patient.svg', navigateTo: '/form-patient-record' },
    { label: 'Привязать/отвязать карту', icon: 'link_unlink_card.svg', navigateTo: '/link-unlink-card' },
    { label: 'Назначить препараты пациенту', icon: 'prescribe_medications.svg', navigateTo: '/prescribe-medications' },
    { label: 'Посмотреть/изменить данные о пациенте', icon: 'patient_data.svg', navigateTo: '/change-patient-data' },
    { label: 'Просмотреть журнал приёма лекарств', icon: 'journal_medication_intake.svg', navigateTo: '/medication-journal' },
    { label: 'Изменить наименование таблеток в отсеке', icon: 'name_tablets_in_compartment.svg', navigateTo: '/change-tablet-name' },
    { label: 'Добавить таблетки в отсек', icon: 'add_tablets_to_compartment.svg', navigateTo: '/add-tablets' },
    { label: 'Просмотреть/изменить график приема лекарств пациента', icon: 'individual_patient\'s_medication_schedule.svg', navigateTo: '/change-medication-schedule' }
  ];

  filteredActions = [...this.actions];
  searchText: string = '';

  constructor(private router: Router) {}

  navigate(path: string): void {
    this.router.navigate([path]);
  }

  filterActions(): void {
    const query = this.searchText.trim().toLowerCase();
    if (query) {
      this.filteredActions = this.actions.filter(action =>
        action.label.toLowerCase().includes(query)
      );
    } else {
      this.filteredActions = [...this.actions];
    }
  }
}
