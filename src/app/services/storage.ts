import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }
  //save measurement unit preference
  async setMeasurementUnit(unit: string) {
    await this._storage?.set('measurementUnit', unit);
  }
  async getMeasurementUnit(): Promise<string> {
    const unit = await this._storage?.get('measurementUnit');
    return unit || 'metric'; //default to metric
  }
  //fav management
  async getFavourites(): Promise<any[]> {
    const favourites = await this._storage?.get('favourites');
    return favourites || [];
  }

  async addFavourite(recipe: any) {
    const favourites = await this.getFavourites();
    //check if already exists
    const exists = favourites.find(f => f.id === recipe.id);
    if (!exists) {
      favourites.push(recipe);
      await this._storage?.set('favourites', favourites);
    }
  }
  async removeFavourite(recipeId: number) {
    let favourites = await this.getFavourites();
    favourites = favourites.filter(f => f.id !== recipeId);
    await this._storage?.set('favourites', favourites);
  }


  
  async isFavourite(recipeId: number): Promise<boolean> {
    const favourites = await this.getFavourites();
    return favourites.some(f => f.id === recipeId);
  }

  //new ratings
  async setRecipeRating(recipeId: number, rating: number) {
    const ratings = await this.getRecipeRatings();
    ratings[recipeId] = rating;
    await this._storage?.set('recipeRatings', ratings);
  }
  async getRecipeRating(recipeId: number): Promise<number> {
    const ratings = await this.getRecipeRatings();
    return ratings[recipeId] || 0;
  }

  async getRecipeRatings(): Promise<any> {
    const ratings = await this._storage?.get('recipeRatings');
    return ratings || {};
  }
}