import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class HeartBeatService {

  public restIntervalSubject: BehaviorSubject<dayjs.Dayjs> = new BehaviorSubject<dayjs.Dayjs>(dayjs());
  private restInterval: Observable<number> = interval(environment.restInterval);
  private finished = false;
  constructor() { }

  public start(): void {
    this.finished = false;
    this.restInterval
      .pipe(takeWhile(() => !this.finished))
      .subscribe(val => this.callHeartBeat());
  }

  public stop(): void {
    this.finished = true;
  }

  private callHeartBeat(): void {
    this.restIntervalSubject.next(dayjs());
  }
}
