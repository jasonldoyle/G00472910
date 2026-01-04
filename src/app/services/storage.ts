import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  //meeasurement unit preference
  async setMeasurementUnit(unit: string) {
    localStorage.setItem('measurementUnit', unit);
  }

  async getMeasurementUnit(): Promise<string> {
    return localStorage.getItem('measurementUnit') || 'metric';
  }

  //favs management
  async getFavourites(): Promise<any[]> {
    const favourites = localStorage.getItem('favourites');
    return favourites ? JSON.parse(favourites) : [];
  }

  async addFavourite(recipe: any) {
    const favourites = await this.getFavourites();
    const exists = favourites.find(f => f.id === recipe.id);
    if (!exists) {
      favourites.push(recipe);
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }
  }

  async removeFavourite(recipeId: number) {
    let favourites = await this.getFavourites();
    favourites = favourites.filter(f => f.id !== recipeId);
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }

  async isFavourite(recipeId: number): Promise<boolean> {
    const favourites = await this.getFavourites();
    return favourites.some(f => f.id === recipeId);
  }

  //recipe ratings
  async setRecipeRating(recipeId: number, rating: number) {
    const ratings = await this.getRecipeRatings();
    ratings[recipeId] = rating;
    localStorage.setItem('recipeRatings', JSON.stringify(ratings));
  }

  async getRecipeRating(recipeId: number): Promise<number> {
    const ratings = await this.getRecipeRatings();
    return ratings[recipeId] || 0;
  }

  async getRecipeRatings(): Promise<any> {
    const ratings = localStorage.getItem('recipeRatings');
    return ratings ? JSON.parse(ratings) : {};
  }

  //shop list management
  async getShoppingList(): Promise<any[]> {
    const list = localStorage.getItem('shoppingList');
    return list ? JSON.parse(list) : [];
  }

  async addToShoppingList(ingredient: string) {
    const list = await this.getShoppingList();
    const exists = list.find(item => item.name === ingredient);
    if (!exists) {
      list.push({
        name: ingredient,
        checked: false,
        addedAt: new Date().toISOString()
      });
      localStorage.setItem('shoppingList', JSON.stringify(list));
    }
  }

  async toggleShoppingItem(ingredient: string) {
    const list = await this.getShoppingList();
    const item = list.find(i => i.name === ingredient);
    if (item) {
      item.checked = !item.checked;
      localStorage.setItem('shoppingList', JSON.stringify(list));
    }
  }

  async removeShoppingItem(ingredient: string) {
    let list = await this.getShoppingList();
    list = list.filter(item => item.name !== ingredient);
    localStorage.setItem('shoppingList', JSON.stringify(list));
  }

  async clearCheckedItems() {
    let list = await this.getShoppingList();
    list = list.filter(item => !item.checked);
    localStorage.setItem('shoppingList', JSON.stringify(list));
  }
}