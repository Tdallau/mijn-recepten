import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MijnReceptenLogon } from '../_models/logon/mijn.recepten.logon';
import { NavbarService } from '../_services/navbar.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Recipe } from '../_models/common/recipe';
import { InputPopupComponent } from '../_common/input-popup/input-popup.component';
import { ConfirmComponent } from '../_common/confirm-popup/confirm.component';
import { RecipeService } from '../_services/recipe.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public user = JSON.parse(localStorage.getItem('currentLogon')) as MijnReceptenLogon;
  public recipes: Recipe[];
  public term: string;
  public sortFields = ['-favorite', 'name'];
  trigger = false;

  constructor(public nav: NavbarService, private modalService: BsModalService, private recipeService: RecipeService,
    private router: Router) {
    if (this.user === null) { this.router.navigateByUrl('/login'); } else {
      recipeService.getRecipes().subscribe(result => {
        result.map(x => {
          x.name = x.name.toLowerCase();
        });
        this.recipes = result;
        // this.spinner.hide();
      });
    }
  }

  ngOnInit() {
    this.nav.show();
  }

  btnClick(recipe: Recipe): void {
    this.router.navigateByUrl(`/recipe/${recipe.id}`);
  }

  setFavourite(recipe: Recipe): void {
    this.trigger = !this.trigger;
    this.recipeService.updateFavorite(recipe);
    recipe.favorite = !recipe.favorite;
  }

  deleteRecipe = (id, index) => {
    if (this.user.user.role === 'Admin') {
      const initialState = {
        text: 'weet je zeker dat je dit recept wilt verwijderen?',
        recipeId: id,
        index: index,
        homeComp: this
      };
      const modalRef = this.modalService.show(ConfirmComponent, { initialState, class: 'modal-sm' });
      return modalRef.content.onClose;
    } else {
      alert('je hebt geen regten om dit te doen.');
    }
  }

  updateRecipe(recipe: Recipe): void {
    const initialState = {
      recipe: recipe,
      homeComp: this
    };
    const modalRef = this.modalService.show(InputPopupComponent, { initialState, class: 'modal-lg' });
    return modalRef.content.onClose;
  }

}

