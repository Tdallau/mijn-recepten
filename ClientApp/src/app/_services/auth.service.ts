import { Injectable, Inject, isDevMode } from '@angular/core';
import { MijnReceptenLogon } from '../_models/logon/mijn.recepten.logon';
import { MijnReceptenLogonRequest } from '../_models/logon/mijn.recepten.logon.request';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ok } from 'assert';
import { Credentials } from '../_models/logon/credentinals';
import { MijnReceptenRegister } from '../_models/logon/mijn.recepten.register';
import { Router } from '@angular/router';
import { User } from '../_models/logon/user';
import { apiUrl } from '../_helpers/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentLogon: MijnReceptenLogon;
  loginBusy: boolean;
  loginData: Credentials = new Credentials('', '', false);
  registerData: MijnReceptenRegister = new MijnReceptenRegister('', '', '');
  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') private Url: string,
              private router: Router) {
    this.currentLogon = JSON.parse(localStorage.getItem('currentLogon')) as MijnReceptenLogon;
    this.baseUrl = Url;

  }

  clear(): void {
    localStorage.removeItem('currentLogon');
    localStorage.removeItem('recipes');
    this.currentLogon = null;
    // this.loginData = new Credentials('', '', false);
  }

  private setCurrentLogon(logon: MijnReceptenLogon): void {
    this.currentLogon = logon;
    localStorage.setItem('currentLogon', JSON.stringify(logon));
  }

  /** POST ShopPortalLogonRequest to get ShopPortalLogon */
  private getMijnReceptenLogon(logonRequest: MijnReceptenLogonRequest): Observable<MijnReceptenLogon> {
    return this.http.post<MijnReceptenLogon>(this.baseUrl + 'auth/login', logonRequest)
      .pipe(
        mergeMap((logon: MijnReceptenLogon) => {
          logon.user.password = logonRequest.Password;
          this.setCurrentLogon(logon);
          return of(logon);
        })
      );
  }
  public getCurrentLogon(): Observable<MijnReceptenLogon> {
    const now = new Date();
    const expDate = new Date(new Date(1970, 0, 1).setSeconds(+this.currentLogon.user.exp));
    if (this.currentLogon && expDate > now) {
      return of(this.currentLogon);
    } else if (this.currentLogon) {
      // tslint:disable-next-line:no-console
      console.info('Token expired.. getting new token...');
      return this.getNewLogon();
    }
  }
  public getNewLogon(): Observable<MijnReceptenLogon> {
    const request = new MijnReceptenLogonRequest(
      this.currentLogon.user.email,
      this.currentLogon.user.password,
    );
    return this.getMijnReceptenLogon(request);
  }

  public getCookieList(): Credentials[] {
    const data = localStorage.getItem('credentials');
    if (data) { return JSON.parse(data) as Credentials[]; }
    return [];
  }

  public getCookieSingle(grossier: number): Credentials {
    const data = localStorage.getItem('credentials');
    if (data) { return JSON.parse(data) as Credentials; }
    return null;
  }

  public saveCookieList(data: Credentials[]): void {
    localStorage.setItem('credentials', JSON.stringify(data));
  }

  private saveCookieSingle(data: Credentials): void {
    localStorage.setItem('credentials', JSON.stringify(data));
  }

  private removeCookieList(): void {
    localStorage.removeItem('credentials');
  }



  public removeAllCookies(grossier: number): void {
    this.removeCookieList();
  }

  private updateCookie(logon: MijnReceptenLogon) {
    let data = this.getCookieList();
    const credentials = new Credentials(logon.user.email, logon.user.password, false);
    data = data.filter(cred => !(cred.Username === credentials.Username && cred.Password === credentials.Password));
    if (credentials.KeepLogin) {
      this.saveCookieSingle(credentials);
      data.unshift(credentials);
    } else {
      this.removeCookieList();
    }
    this.saveCookieList(data);
  }

  public doLogin(): void {
    this.doLogout()
      .subscribe(_ => {
        this.loginBusy = true;
        const request = new MijnReceptenLogonRequest(
          this.loginData.Username,
          this.loginData.Password,
        );
        this.getMijnReceptenLogon(request)
          .subscribe(
            (logon: MijnReceptenLogon) => {
              if (logon) {
                this.updateCookie(logon);
                this.loginBusy = false;
                this.router.navigateByUrl('/');
              }
            },
            (err: HttpErrorResponse) => {
              this.loginBusy = false;
              // this.mainService.msgBox('Let op!', err.statusText);
            });
      });
  }

  public doRegister(): void {
    // console.log(this.registerData);
    this.http.post(this.baseUrl + 'auth/register', this.registerData).subscribe((res: User) => {
      this.loginData.Username = res.email;
      this.loginData.Password = res.passwordHash;
      this.doLogin();
    });
  }

  public doLogout(): Observable<boolean> {
    if (this.currentLogon) {
      this.clear();
      this.router.navigateByUrl('/login');
      return of(false);
    } else {
      return of(true);
    }
  }
}
