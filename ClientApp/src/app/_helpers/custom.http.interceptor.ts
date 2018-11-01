import { throwError as observableThrowError, Observable, of } from 'rxjs';
import { mergeMap, tap, catchError } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';



import { AuthService } from '../_services/auth.service';
import { MijnReceptenLogon } from '../_models/logon/mijn.recepten.logon';
import { Router } from '@angular/router';


@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(
    private inj: Injector
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.endsWith('/auth/login') || request.url.endsWith('/auth/register')) {
      return this.handleIntercept(null, request, next, 1);
    }
    const authService = this.inj.get(AuthService);
    return authService.getCurrentLogon()
      .pipe(mergeMap((logon: MijnReceptenLogon) => {
        return this.handleIntercept(logon, request, next, 1)
          .pipe(mergeMap((response: HttpEvent<any>) => {
            if (response) { return of(response); }
            // tslint:disable-next-line:no-console
            console.info(`Http error on '${request.url}' get new logon and try again...`);
            return authService.getNewLogon()
              .pipe(mergeMap((newLogon: MijnReceptenLogon) => {
                return this.handleIntercept(newLogon, request, next, 2);
              }));
          }));
      }));
  }

  private handleIntercept(logon: MijnReceptenLogon, request: HttpRequest<any>, next: HttpHandler, tries: number):
    Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let customReq: HttpRequest<any>;
    if (logon) {
      customReq = request.clone({
        headers: request.headers
          .set('Authorization', 'Bearer ' + logon.token)
          .set('Content-Type', 'application/json')
      });
    } else {
      customReq = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
      });
    }

    return next
      .handle(customReq)
      .pipe(tap((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
          // console.info('processing response', ev);
        }
      }))
      .pipe(catchError(response => {
        if (response instanceof HttpErrorResponse) {
          if (response.statusText === 'De loginnaam of het wachtwoord is onjuist.') {
            console.warn('De loginnaam of het wachtwoord is onjuist. Logout and redirect to /logout');
            const router = this.inj.get(Router);
            router.navigate(['/logout']);
            return observableThrowError(response);
          } else if (logon && tries === 1) {
            return of(null);
          }
        }
        console.error('Processing http error', response);
        return observableThrowError(response);
      }));
  }
}
