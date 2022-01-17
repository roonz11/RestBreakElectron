import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import * as dayjs from 'dayjs'
@Injectable({
  providedIn: 'root'
})
export class HeartBeatService {
  public restIntervalSubject: BehaviorSubject<dayjs.Dayjs> = new BehaviorSubject<dayjs.Dayjs>(dayjs());
  private restInterval: Observable<number> = interval(environment.restInterval);
  private intervalElapsed: boolean = false;
  constructor() { }

  public start (): void {
    console.log(environment.restInterval)
    this.restInterval
      .pipe(takeWhile(() => !this.intervalElapsed))
      .subscribe(() => this.callHeartBeat());
  }

  public stop (): void {
    this.intervalElapsed = true;
  }

  private callHeartBeat (): void {
    this.restIntervalSubject.next(dayjs());
  }
}
