import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { MijnReceptenLogon } from '../_models/logon/mijn.recepten.logon';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = JSON.parse(
      localStorage.getItem('currentLogon')
    ) as MijnReceptenLogon;

    if (user && user.user.role === 'Admin') {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
