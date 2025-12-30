import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon } from '@ionic/angular/standalone';
import { StorageService } from '../services/storage';
import { addIcons } from 'ionicons';
import { star } from 'ionicons/icons';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonButton, RouterLink, IonIcon]
})

export class FavouritesPage implements OnInit {
  favourites: any[] = [];

  constructor(private storageService: StorageService) {
    addIcons({ star });
  }

  async ngOnInit() {
    await this.loadFavourites();
  }

  async ionViewWillEnter() {
    await this.loadFavourites();
  }

  async loadFavourites() {
    this.favourites = await this.storageService.getFavourites();
    //load the ratings for each favs
    for (let recipe of this.favourites) {
      recipe.rating = await this.storageService.getRecipeRating(recipe.id);
    }
    console.log('Loaded favourites with ratings:', this.favourites);
  }

  getStarArray(rating: number) {
    return Array(Math.floor(rating)).fill(0);
  }
}