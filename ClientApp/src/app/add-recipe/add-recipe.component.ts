import { Component, OnInit, Inject } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

import * as Tesseract from 'tesseract.js';
import { Links } from '../_models/common/links';
import { NavbarService } from '../_services/navbar.service';
import { RecipeService } from '../_services/recipe.service';
import { LoggerService } from '../_services/logger.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, public nav: NavbarService, public recipeService: RecipeService) {
  }

  ngOnInit() {
    this.nav.show();
  }

  public fileUploadImg(files) {
    const file = files[0];
    LoggerService.Log(file);
    this.spinner.show();
    const self = this;
    Tesseract
      .recognize(file)
      .then((result: any) => {
        const res = result.text.split(/\r?\n/);

        for (let i = 1; i < res.length; i++) {
          if (res[i] !== '') {
            this.recipeService.recipe.ingredients.push(res[i]);
          }
        }
        this.recipeService.recipe.persons = res[0];
        this.spinner.hide();
      })
      .catch(console.error);
  }

  public fileUploadTxt = files => {
    const file = files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    const self = this;
    reader.onload = () => {
      const res = reader.result.toString();
      const split: string[] = res.split(/\r?\n/);
      for (const link of split) {
        if (link.includes('www')) {
          const l: Links = {
            id: null,
            recipeId: null,
            name: link
          };
          self.recipeService.recipe.links.push(l);
        }
      }
    };
  }

}
