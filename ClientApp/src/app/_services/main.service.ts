import { Injectable } from '@angular/core';
import { MijnReceptenLogon } from '../_models/logon/mijn.recepten.logon';
import { Router } from '@angular/router';
import { LoggerService } from './logger.service';


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
}
