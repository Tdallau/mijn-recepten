import { isDevMode } from '@angular/core';

export class LoggerService {

  public static Log(text: any) {
    const dev = isDevMode();
    console.log(dev);
    if (dev) {
      console.log(text);
    }
  }
}
