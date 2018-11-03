import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MainService } from 'src/app/_services/main.service';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css']
})
export class ConfirmPopupComponent implements OnInit {
  text: string;
  recipeId: number;
  index: number;
  homeComp: any;

  public onClose: Subject<boolean>;

  constructor(private bsModalRef: BsModalRef, private mainService: MainService) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  public confirm() {
    this.onClose.next(true);
    this.mainService.deleteRecipe(this.recipeId);
    this.homeComp.recipes.splice(this.index, 1);
    this.bsModalRef.hide();
  }

  public decline() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

}
