import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }
  public swicthIfWithCtrlShift(event: MouseEvent, input: boolean): boolean {
    if (event.shiftKey && event.ctrlKey) {
      return !input;
    }
    return input;
  }
}
