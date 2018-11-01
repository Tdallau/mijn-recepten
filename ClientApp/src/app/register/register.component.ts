import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { MainService } from '../_services/main.service';
import { NavbarService } from '../_services/navbar.service';
import { Router } from '@angular/router';
import { MijnReceptenLogon } from '../_models/logon/mijn.recepten.logon';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isPwVisible = false;
  user = JSON.parse(localStorage.getItem('currentLogon')) as MijnReceptenLogon;

  constructor(public authService: AuthService, public mainService: MainService, public nav: NavbarService, public router: Router) {
    if (this.user != null) {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit() {
    this.nav.hide();
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
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
