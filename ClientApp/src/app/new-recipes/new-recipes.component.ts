import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../_services/navbar.service';
import { EdamamService } from '../_services/edamam.service';
import { LoggerService } from '../_services/logger.service';

@Component({
  selector: 'app-new-recipes',
  templateUrl: './new-recipes.component.html',
  styleUrls: ['./new-recipes.component.scss']
})
export class NewRecipesComponent implements OnInit {
  public term: string;
  public hits: HitsItem[];

  constructor(private nav: NavbarService, private edamam: EdamamService) {}

  ngOnInit() {
    this.nav.show();
  }
  searchRecipes() {
    LoggerService.Log(this.term);
    if (this.term !== '' && this.term !== undefined) {
      this.edamam.getRecipes(this.term).subscribe((recipes: EdamanResult) => {
        this.hits = recipes.hits;
      });
    } else {
      LoggerService.Log('first add type');
    }
  }
}
