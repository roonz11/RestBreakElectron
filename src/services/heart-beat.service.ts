import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, interval } from 'rxjs';
import * as dayjs from 'dayjs'
@Injectable({
  providedIn: 'root'
})
export class HeartBeatService {
  public restIntervalSubject: BehaviorSubject<dayjs.Dayjs> = new BehaviorSubject<dayjs.Dayjs>(dayjs());
  private restInterval: any;
  constructor() { }

  public start (): void {
    console.log(environment.restInterval)
    this.restInterval = interval(environment.restInterval)
      .subscribe(val => this.callHeartBeat());
  }

  public stop (): void {
    this.restInterval = null;
  }

  private callHeartBeat (): void {
    this.restIntervalSubject.next(dayjs());
  }
}
