import { Injectable, Inject, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../_models/common/recipe';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  public user = JSON.parse(localStorage.getItem('currentLogon'));
  public recipe: Recipe = new Recipe('', this.user ? this.user.user.name : 'No user' , '', [], [], '');
  public baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') private Url: string) {
    this.baseUrl =  Url;
  }

  // request for updating a recipe
  public updateRecipe(id: number, recipe: Recipe): void {
    LoggerService.Log('updateRecipe');
    this.http.put(`api/recipe/${id}`, recipe).subscribe();
  }

  // request for delete a recipe
  public deleteRecipe(id: number): void {
    LoggerService.Log('delete recipe');
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

  public onSubmit(f: NgForm) {
    this.http.post(`${this.baseUrl}api/recipe`, this.recipe).subscribe((result: { id: number }) => {
      this.recipe.ingredients.forEach(res => {
        const body = {
          recipeId: result.id,
          ingredient: res
        };
        this.http.post(`${this.baseUrl}api/ingredient`, body).subscribe(_ => {
        });
      });
      this.recipe.links.forEach(res => {
        this.http.post(`${this.baseUrl}api/link`, { recipeId: result.id, link: res }).subscribe(_ => {
        });
      });
      f.reset();
    });
  }
}
