import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, setDoc, doc, getDoc, getDocs } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  // Метод для проверки, пустая ли коллекция
  async isCollectionEmpty(collectionName: string): Promise<boolean> {
    const collRef = collection(this.firestore, collectionName);
    const snapshot = await getDocs(collRef);
    return snapshot.empty; // Вернет true, если коллекция пуста
  }

  // 1. Назначение лекарств (medication_assignments) с уникальным patient_info
  async addMedicationAssignment(data: {
    patient_info: string;
    patient_card_id: string;
    doctor_info: string;
    nurse_info: string;
    medications: { medication_name: string }[];
  }) {
    const docRef = doc(this.firestore, `medication_assignments/${data.patient_info}`);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      throw new Error(`Пациент с именем ${data.patient_info} уже существует.`);
    }

    await setDoc(docRef, data); // Используем setDoc для уникального patient_info
  }

    // 2. История получения таблеток (medication_history)
    async addMedicationHistory(data: {
      patient_info: string;
      datetime: Date;
      medications: { medication_name: string; quantity_dispensed: number }[];
    }) {
      const collRef = collection(this.firestore, 'medication_history');
      await addDoc(collRef, data); // Используем addDoc для добавления новой записи
    }

  // 3. История внесения таблеток (medication_refills)
  async addMedicationRefill(data: {
    compartment_id: string;
    quantity: number;
    refill_date: Date;
  }) {
    const docRef = doc(this.firestore, `medication_refills/${data.compartment_id}`);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      throw new Error(`Отсек с номером ${data.compartment_id} уже существует.`);
    }

    await setDoc(docRef, data);
  }

  // 4. Оставшееся количество таблеток (remaining_medications)
  async setRemainingMedication(compartment_id: string, data: {
    medication_name: string;
    remaining_quantity: number;
  }) {
    const docRef = doc(this.firestore, `remaining_medications/${compartment_id}`);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      throw new Error(`Отсек с номером ${compartment_id} уже существует.`);
    }

    await setDoc(docRef, data); // Используем setDoc для уникального compartment_id
  }

  // 5. Соответствие карт RFID (rfid_mappings) с уникальным rfid_card_id
  async setRfidMapping(rfid_card_id: string, data: { patient_card_id: string }) {
    const docRef = doc(this.firestore, `rfid_mappings/${rfid_card_id}`);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      throw new Error(`RFID карта с идентификатором ${rfid_card_id} уже существует.`);
    }

    await setDoc(docRef, data); // Используем setDoc для уникального rfid_card_id
  }

  // 6. График приема лекарств (medication_templates)
  async addMedicationTemplate(data: {
    medication_name: string;
    default_time_slots: { time: string; frequency: string; dosage: string; number_days: number }[];
  }) {
    const collRef = collection(this.firestore, 'medication_templates');
    await addDoc(collRef, data);
  }

  // 7. Персонализированный график пациента (patient_medication_schedule)
  async addPatientMedicationSchedule(data: {
    patient_info: string;
    medication_times: {
      medication_name: string;
      time: string;
      frequency: string;
      dosage: string;
      start_date: Date;
      end_date: Date;
    }[];
  }) {
    const docRef = doc(this.firestore, `patient_medication_schedule/${data.patient_info}`);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      throw new Error(`График для пациента ${data.patient_info} уже существует.`);
    }

    await setDoc(docRef, data);
  }

  // 8. Контакты для уведомлений (contact_information) с уникальным phone_number
  async setContactInformation(phone_number: string, data: { info: string }) {
    const docRef = doc(this.firestore, `contact_information/${phone_number}`);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      throw new Error(`Контакт с номером телефона ${phone_number} уже существует.`);
    }

    await setDoc(docRef, data); // Используем setDoc для уникального phone_number
  }

  // 9. История пуш-уведомлений (notification_history)
  async addNotificationHistory(data: {
    date: Date;
    time: string;
    type: string;
    message: string;
  }) {
    const collRef = collection(this.firestore, 'notification_history');
    await addDoc(collRef, data);
  }
}