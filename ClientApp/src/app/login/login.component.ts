import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { MijnReceptenLogon } from '../_models/logon/mijn.recepten.logon';
import { Router } from '@angular/router';
import { MainService } from '../_services/main.service';
import { NavbarService } from '../_services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @Output() wholesalerChange = new EventEmitter();
  isPwVisible = false;
  user = JSON.parse(localStorage.getItem('currentLogon')) as MijnReceptenLogon;

  constructor(public authService: AuthService, public mainService: MainService, public nav: NavbarService, private router: Router) {
    if (this.user != null) {
      this.router.navigateByUrl('/');
    }
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }

  ngOnInit() {
    this.nav.hide();
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
