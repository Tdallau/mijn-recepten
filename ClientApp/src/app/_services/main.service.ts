import { Injectable } from '@angular/core';

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
