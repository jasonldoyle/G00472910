import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton } from '@ionic/angular/standalone';
import { StorageService } from '../services/storage';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonButton, RouterLink]
})
export class FavouritesPage implements OnInit {
  favourites: any[] = [];

  constructor(private storageService: StorageService) { }

  async ngOnInit() {
    await this.loadFavourites();
  }

  async ionViewWillEnter() {
    //reload when page is entered (in case favs changed)
    await this.loadFavourites();
  }

  async loadFavourites() {
    this.favourites = await this.storageService.getFavourites();
    console.log('Loaded favourites:', this.favourites);
  }

}