import { Component, OnInit, Inject, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { NavbarService } from '../_services/navbar.service';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  public id: string;
  public recipe: Recipe;
  public url: string;

  constructor(public nav: NavbarService, private route: ActivatedRoute, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    const id = this.route.snapshot.paramMap.get('id');
    http.get<Recipe>(baseUrl + `api/recipe/${id}`).subscribe(result => {
      this.recipe = result;
      this.url = `https://www.youtube.com/embed/${this.recipe.videoId}`;
    }, error => console.error(error));
  }

  ngOnInit() {
    this.nav.show();
  }

}

interface Recipe {
  name: string;
  requester: string;
  persons: string;
  id: number;
  ingredients: Ingredients[];
  links: any[];
  videoId: string;
}

interface Ingredients {
  id: number;
  recipeId: number;
  ingredient: string;
}
