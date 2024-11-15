import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ActionComponent } from './action/action.component';
import { NotificationComponent } from './notification/notification.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FirebaseService } from './services/firebase.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, AuthComponent, HeaderComponent, ActionComponent, NotificationComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  constructor(
    private firebaseService: FirebaseService,
    public authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    // Сброс состояния авторизации при переходе на страницу авторизации
    if (this.router.url === '/login') {
      this.authService.resetAuth();
    }

    // Проверяем, пустые ли коллекции перед добавлением данных
    await this.checkAndCreateInitialData();
  }

  async checkAndCreateInitialData() {
    try {
      // Проверка, пустая ли каждая коллекция перед добавлением данных
      const collections = [
        'medication_assignments',
        'medication_history',
        'medication_refills',
        'remaining_medications',
        'rfid_mappings',
        'medication_templates',
        'patient_medication_schedule',
        'contact_information',
        'notification_history'
      ];

      for (const collectionName of collections) {
        const isEmpty = await this.firebaseService.isCollectionEmpty(collectionName);
        if (isEmpty) {
          console.log(`Collection ${collectionName} is empty. Adding initial data.`);
          await this.createInitialData();
          break; // Если мы уже добавили данные, выходим из цикла
        } else {
          console.log(`Collection ${collectionName} already has data.`);
        }
      }
    } catch (error) {
      console.error('Error checking collections or adding initial data:', error);
    }
  }

  async createInitialData() {
    try {
      // Добавление начальных данных в коллекции
      // 1. medication_assignments
      for (let i = 1; i <= 3; i++) {
        await this.firebaseService.addMedicationAssignment({
          patient_info: `Patient ${i}`,
          patient_card_id: `Card-${i}`,
          doctor_info: `Doctor ${i}`,
          nurse_info: `Nurse ${i}`,
          medications: [{ medication_name: `Medication ${i}` }]
        });
      }

      // 2. medication_history
      for (let i = 1; i <= 3; i++) {
        await this.firebaseService.addMedicationHistory({
          patient_info: `Patient ${i}`,
          datetime: new Date(),
          medications: [{ medication_name: `Medication ${i}`, quantity_dispensed: i }]
        });
      }

      // 3. medication_refills
      for (let i = 1; i <= 3; i++) {
        await this.firebaseService.addMedicationRefill({
          compartment_id: `Compartment-${i}`,
          quantity: 100 * i,
          refill_date: new Date()
        });
      }

      // 4. remaining_medications
      for (let i = 1; i <= 3; i++) {
        await this.firebaseService.setRemainingMedication(`Compartment-${i}`, {
          medication_name: `Medication ${i}`,
          remaining_quantity: 50 * i
        });
      }

      // 5. rfid_mappings
      for (let i = 1; i <= 3; i++) {
        await this.firebaseService.setRfidMapping(`RFID-${i}`, { patient_card_id: `Card-${i}` });
      }

      // 6. medication_templates
      for (let i = 1; i <= 3; i++) {
        await this.firebaseService.addMedicationTemplate({
          medication_name: `Medication ${i}`,
          default_time_slots: [
            { time: '08:00', frequency: 'daily', dosage: '1 pill', number_days: 30 },
            { time: '20:00', frequency: 'daily', dosage: '1 pill', number_days: 30 }
          ]
        });
      }

      // 7. patient_medication_schedule
      for (let i = 1; i <= 3; i++) {
        await this.firebaseService.addPatientMedicationSchedule({
          patient_info: `Patient ${i}`,
          medication_times: [
            {
              medication_name: `Medication ${i}`,
              time: '08:00',
              frequency: 'daily',
              dosage: '1 pill',
              start_date: new Date(),
              end_date: new Date(new Date().setDate(new Date().getDate() + 30))
            }
          ]
        });
      }

      // 8. contact_information
      for (let i = 1; i <= 3; i++) {
        await this.firebaseService.setContactInformation(`+1234567890${i}`, { info: `Contact ${i}` });
      }

      // 9. notification_history
      for (let i = 1; i <= 3; i++) {
        await this.firebaseService.addNotificationHistory({
          date: new Date(),
          time: '09:00',
          type: `Type ${i}`,
          message: `Message ${i}`
        });
      }

      console.log('Initial data added successfully');
    } catch (error) {
      console.error('Error adding initial data:', error);
    }
  }
}
