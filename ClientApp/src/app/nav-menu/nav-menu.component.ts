import { Component } from '@angular/core';
import { MijnReceptenLogon } from '../_models/logon/mijn.recepten.logon';
import { AuthService } from '../_services/auth.service';
import { NavbarService } from '../_services/navbar.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  public user = JSON.parse(localStorage.getItem('currentLogon')) as MijnReceptenLogon;
  constructor(public nav: NavbarService, public authService: AuthService) {
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
