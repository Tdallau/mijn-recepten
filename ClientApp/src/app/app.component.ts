import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MijnReceptenLogon } from './_models/logon/mijn.recepten.logon';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
}
