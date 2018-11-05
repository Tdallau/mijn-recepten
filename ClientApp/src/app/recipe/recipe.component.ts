import { Component, OnInit, Inject, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { NavbarService } from '../_services/navbar.service';
import { RecipeService } from '../_services/recipe.service';
import { Recipe } from '../_models/common/recipe';

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

  constructor(public nav: NavbarService, private recipeService: RecipeService, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    recipeService.getRecipe(id).subscribe((res: Recipe) => {
      this.recipe = res;
      this.url = `https://www.youtube.com/embed/${this.recipe.videoId}`;
    }, error => console.error(error));
  }

  ngOnInit() {
    this.nav.show();
  }

}
