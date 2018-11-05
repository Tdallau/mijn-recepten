import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../_models/common/recipe';
import { Observable } from 'rxjs';
import { User } from '../_models/logon/user';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  // request for updating a recipe
  public updateRecipe(id: number, recipe: Recipe): void {
    console.log('updateRecipe');
    this.http.put(`api/recipe/${id}`, recipe).subscribe();
  }

  // request for delete a recipe
  public deleteRecipe(id: number): void {
    console.log('delete recipe');
    this.http.delete(`api/recipe/${id}`).subscribe();
  }

  // request for an array with all recipes
  public getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}api/recipe/`);
  }

  // request for specific recipe on id
  public getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}api/recipe/${id}`);
  }

  // request for updating favorite
  public updateFavorite(recipe: Recipe): void {
    this.http.post('api/favorite', { recipeId: recipe.id}).subscribe();
  }
}
