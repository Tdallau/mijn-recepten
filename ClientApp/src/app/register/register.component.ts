import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { MainService } from '../_services/main.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public authService: AuthService, public mainService: MainService) { }

  ngOnInit() {
  }
  public keytab(event) {
    const element = event.srcElement.nextElementSibling; // get the sibling element
    if (element == null) {
      return;
    } else {
      element.focus();   // focus if not null
    }
  }

}
