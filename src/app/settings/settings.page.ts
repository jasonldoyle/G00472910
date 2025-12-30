import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonListHeader, IonLabel, IonRadioGroup, IonItem, IonRadio } from '@ionic/angular/standalone';
import { StorageService } from '../services/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonList, IonListHeader, IonLabel, IonRadioGroup, IonItem, IonRadio]
})
export class SettingsPage implements OnInit {
  measurementUnit: string = 'metric';

  constructor(private storageService: StorageService) { }

  async ngOnInit() {
    //load saved prefs
    this.measurementUnit = await this.storageService.getMeasurementUnit();
  }

  async onMeasurementChange() {
    ///save when changed
    await this.storageService.setMeasurementUnit(this.measurementUnit);
    console.log('Saved measurement unit:', this.measurementUnit);
  }

}