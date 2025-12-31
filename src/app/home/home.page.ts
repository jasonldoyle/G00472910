import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonItem, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cart, heart, settings } from 'ionicons/icons';
import { RecipeService } from '../services/recipe';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonIcon, IonItem, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent],
})
export class HomePage {
  ingredients: string = '';
  recipes: any[] = [];
  searching: boolean = false;

  constructor(private recipeService: RecipeService) {
    addIcons({ cart, heart, settings });
  }

  searchRecipes() {
    if (!this.ingredients.trim()) {
      return;
    }

    this.searching = true;
    this.recipeService.searchRecipes(this.ingredients).subscribe({
      next: (data) => {
        this.recipes = data.results;
        this.searching = false;
        console.log('Found recipes:', this.recipes);
      },
      error: (error) => {
        console.error('Error searching recipes:', error);
        this.searching = false;
      }
    });
  }
}