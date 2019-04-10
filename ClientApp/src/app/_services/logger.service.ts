import { isDevMode } from '@angular/core';

export class LoggerService {

  public static Log(text: any) {
    if (isDevMode()) {
      console.log(text);
    }
  }

  public static Info(text: any) {
    if (isDevMode()) {
      console.info(text);
    }
  }
  public static Time(text: any) {
    if (isDevMode()) {
      console.time(text);
    }
  }
  public static TimeEnd(text: any) {
    if (isDevMode()) {
      console.timeEnd(text);
    }
  }
}
