import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonItem, IonInput } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, settings } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonItem, IonInput, RouterLink],
})
export class HomePage {
  
  ingredients: string = '';

  constructor() {
    addIcons({ heart, settings });
  }

  searchRecipes() {
      // TODO Connect to Spoonacular API
    console.log('Searching for:', this.ingredients);
  }
}