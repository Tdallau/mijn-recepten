import { Component, OnInit, Inject } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import * as Tesseract from 'tesseract.js';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  public recipe = {
    name: '',
    requester: '',
    persons: '',
    ingredients: [],
    links: [],
    videoId: ''
  };

  constructor(private spinner: NgxSpinnerService, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  public fileUploadImg(files) {
    const file = files[0];
    console.log(file);
    this.spinner.show();
    const self = this;
    Tesseract
      .recognize(file)
      // .progress(console.log)
      .then((result: any) => {
        const res = result.text.split(/\r?\n/);

        for (let i = 1; i < res.length; i++) {
          if (res[i] !== '') {
            this.recipe.ingredients.push(res[i]);
          }
        }
        // alert('de ingredienten zijn succesvol geupload!!!');
        this.recipe.persons = res[0];
        this.spinner.hide();
        // self.setState({ ingredients });
      })
      .catch(console.error);
  }

  public fileUploadTxt = files => {
    const file = files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    const self = this;
    reader.onload = function () {
      const res = reader.result.toString();
      const split: string[] = res.split(/\r?\n/);
      for (const link of split) {
        if (link.includes('www')) {
          self.recipe.links.push(link);
        }
      }
    };
  }
  public onSubmit(f: NgForm) {
    this.http.post(`${this.baseUrl}api/recipe`, {
      name: this.recipe.name,
      requester: this.recipe.requester,
      videoId: this.recipe.videoId,
      persons: this.recipe.persons
    }).subscribe((result: { id: number }) => {
      this.recipe.ingredients.forEach(res => {
        const body = {
          recipeId: result.id,
          ingredient: res
        };
        this.http.post(`${this.baseUrl}api/ingredient`, body).subscribe(_ => {
        });
      });
      this.recipe.links.forEach(res => {
        this.http.post(`${this.baseUrl}api/link`, { recipeId: result.id, link: res }).subscribe(_ => {
        });
      });
      f.reset();
    });
  }



  ngOnInit() {
  }

}
