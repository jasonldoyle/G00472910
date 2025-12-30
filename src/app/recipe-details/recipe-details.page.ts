import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon } from '@ionic/angular/standalone';
import { RecipeService } from '../services/recipe';
import { StorageService } from '../services/storage';
import { addIcons } from 'ionicons';
import { star, starOutline } from 'ionicons/icons';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonButton, IonIcon]
})
export class RecipeDetailsPage implements OnInit {
  recipe: any = null;
  recipeId: number = 0;
  measurementUnit: string = 'metric';
  isFavourite: boolean = false;
  rating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private storageService: StorageService
  ) {
    addIcons({ star, starOutline });
  }

  async ngOnInit() {
        //get recipe ID from routes
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeId = parseInt(id);
      await this.loadRecipe();
    }
    //load measurement preference
    this.measurementUnit = await this.storageService.getMeasurementUnit();
    //check if recipe is in favourites
    this.isFavourite = await this.storageService.isFavourite(this.recipeId);
    //new rating laod
    this.rating = await this.storageService.getRecipeRating(this.recipeId);
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

  async toggleFavourite() {
    if (this.isFavourite) {
      await this.storageService.removeFavourite(this.recipeId);
      this.isFavourite = false;
    } else {
      await this.storageService.addFavourite({
        id: this.recipe.id,
        title: this.recipe.title,
        image: this.recipe.image
      });
      this.isFavourite = true;
    }
  }

  async setRating(stars: number) {
    this.rating = stars;
    await this.storageService.setRecipeRating(this.recipeId, stars);
    console.log('Rating saved:', stars);
  }

  getStarArray() {
    return [1, 2, 3, 4, 5];
  }
}