import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton } from '@ionic/angular/standalone';
import { RecipeService } from '../services/recipe';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonButton]
})


export class RecipeDetailsPage implements OnInit {
  recipe: any = null;
  recipeId: number = 0;
  measurementUnit: string = 'metric';
  isFavourite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    // Get recipe ID from routes
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeId = parseInt(id);
      this.loadRecipe();
    }    
    // TODO: Load measurement pref from store
    // TODO: Check if recipe is in fav
  }

  loadRecipe() {
    this.recipeService.getRecipeDetails(this.recipeId).subscribe({
     
      next: (data) => {
        this.recipe = data;
        console.log('Recipe details:', this.recipe);
      },
      error: (error) => {
        console.error('Error loading recipe:', error);
      }
    });
  }

  toggleFavourite() {
    this.isFavourite = !this.isFavourite;
    // TODO: Save/remove from storage
    console.log('Favourite toggled:', this.isFavourite);
  }

}