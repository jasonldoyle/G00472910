import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonListHeader, IonLabel, IonRadioGroup, IonItem, IonRadio } from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonList, IonListHeader, IonLabel, IonRadioGroup, IonItem, IonRadio]
})
export class SettingsPage implements OnInit {
  measurementUnit: string = 'metric';

  constructor() { }

  ngOnInit() {
    // TODO: Load saved pref from storage
  }

}