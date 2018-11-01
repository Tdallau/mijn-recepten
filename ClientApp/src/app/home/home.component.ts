import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MijnReceptenLogon } from '../_models/logon/mijn.recepten.logon';
import { NavbarService } from '../_services/navbar.service';
import { TouchSequence } from 'selenium-webdriver';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public user = JSON.parse(localStorage.getItem('currentLogon')) as MijnReceptenLogon;
  public recipes: Recipe[];
  public backup: Recipe[];
  public term: string;

  constructor(public nav: NavbarService, http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) {
    if (this.user === null) { this.router.navigateByUrl('/login'); } else {
      http.get<Recipe[]>(baseUrl + 'api/recipe').subscribe(result => {
        this.recipes = result;
        this.backup = result;
        // this.spinner.hide();
      });
    }
  }

  ngOnInit() {
    this.nav.show();
  }

  btnClick = function (recipe: Recipe) {
    this.router.navigateByUrl(`/recipe/${recipe.id}`);
    console.log(recipe.id);
  };

  deleteRecipe = () => {
    if (this.user.user.role === 'Admin') {
      console.log('hallo');
    } else {
      alert('you have no permision to do this');
    }
  }

  searchRecipe = () => {
    if (this.term.trim() !== '') {
      const recipe: Recipe[] = [];
      this.backup.forEach(element => {
        if (element.name.replace(/\s/g, '').toLowerCase().includes(this.term.toLowerCase().replace(/\s/g, ''))) {
          recipe.push(element);
        }
      });
      this.recipes = recipe;
    } else {
      this.recipes = this.backup;
    }
  }

}

interface Recipe {
  name: string;
  requester: string;
  persons: string;
  id: number;
  ingredients: Ingredients[];
  links: any[];
}

interface Ingredients {
  id: number;
  recipeId: number;
  ingredient: string;
}
