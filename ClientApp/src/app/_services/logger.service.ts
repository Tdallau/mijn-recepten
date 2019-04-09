import { isDevMode } from '@angular/core';

export class LoggerService {

  public static Log(text: any) {
    if (isDevMode) {
      console.log(text);
    }
  }
}
