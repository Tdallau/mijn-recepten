import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MainService } from '../../_services/main.service';
import { Recipe } from 'src/app/_models/common/recipe';
import { RecipeService } from 'src/app/_services/recipe.service';

@Component({
  selector: 'app-input-popup',
  templateUrl: './input-popup.component.html',
  styleUrls: ['./input-popup.component.css']
})
export class InputPopupComponent implements OnInit {
  recipe: Recipe;
  homeComp: any;

  public onClose: Subject<string>;

  constructor(private bsModalRef: BsModalRef, private recipeService: RecipeService) { }

  ngOnInit() {
    this.onClose = new Subject();
    // console.log( );
  }

  updateRecipe(): void {
    if (this.recipe != null) {
      this.recipeService.updateRecipe(this.recipe.id, this.recipe);
    }
    this.homeComp.trigger = !this.homeComp.trigger;
    this.confirm();
  }

  public confirm(): void {
    this.onClose.next(this.recipe.name);
    this.bsModalRef.hide();
  }

  public decline() {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }
}
