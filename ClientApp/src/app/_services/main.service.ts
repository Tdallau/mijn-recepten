import { Injectable } from '@angular/core';
import { MijnReceptenLogon } from '../_models/logon/mijn.recepten.logon';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MainService {
  user = JSON.parse(localStorage.getItem('currentLogon')) as MijnReceptenLogon;
  constructor(private router: Router) {
  }
  public swicthIfWithCtrlShift(event: MouseEvent, input: boolean): boolean {
    if (event.shiftKey && event.ctrlKey) {
      return !input;
    }
    return input;
  }
  public checkIfLogedIn() {
    console.log(localStorage.getItem('currentLogon'));
    if (!this.user) {
      this.router.navigateByUrl('/login');
    }
  }
}
