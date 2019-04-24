import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EdamamService {
  constructor(private http: HttpClient) {}

  public getRecipes(term: string): Observable<any> {
    const url = `https://api.edamam.com/search?q=${term}&app_id=${
      environment.appId
    }&app_key=${environment.appKey}`;

    return this.http.get(url);
  }
}
