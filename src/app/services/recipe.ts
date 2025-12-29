import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiKey = '70759a4f7911402abcc53d3c51d3b759';
  private baseUrl = 'https://api.spoonacular.com/recipes';

  constructor(private http: HttpClient) { }

  searchRecipes(ingredients: string): Observable<any> {
    const url = `${this.baseUrl}/complexSearch?query=${ingredients}&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

  getRecipeDetails(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}/information?apiKey=${this.apiKey}`;
    return this.http.get(url);
  }
}