import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MainService } from 'src/app/_services/main.service';
import { RecipeService } from 'src/app/_services/recipe.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  text: string;
  recipeId: number;
  index: number;
  homeComp: any;

  public onClose: Subject<boolean>;

  constructor(private bsModalRef: BsModalRef, private recipeService: RecipeService) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  public confirm(): void {
    this.onClose.next(true);
    this.recipeService.deleteRecipe(this.recipeId);
    this.homeComp.recipes.splice(this.index, 1);
    this.bsModalRef.hide();
  }

  public decline(): void {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

}
