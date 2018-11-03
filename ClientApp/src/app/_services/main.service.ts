import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }
  public swicthIfWithCtrlShift(event: MouseEvent, input: boolean): boolean {
    if (event.shiftKey && event.ctrlKey) {
      return !input;
    }
    return input;
  }

  public updateRecipe(id, recipe) {
    console.log('updateRecipe');
    this.http.put(`api/recipe/${id}`, recipe).subscribe();
  }

  public deleteRecipe(id) {
    console.log('updateRecipe');
    this.http.delete(`api/recipe/${id}`).subscribe();
  }
}
