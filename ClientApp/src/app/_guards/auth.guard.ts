import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { LoggerService } from '../_services/logger.service';
import { MijnReceptenLogon } from '../_models/logon/mijn.recepten.logon';

@Injectable()
export class AuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  user = JSON.parse(localStorage.getItem('currentLogon')) as MijnReceptenLogon;

  constructor(
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    LoggerService.Log(localStorage.getItem('currentLogon'));
    if (!this.user) {
      this.router.navigate(['/login']);
      return of(false);
    }

    return of(true);

  }
}
