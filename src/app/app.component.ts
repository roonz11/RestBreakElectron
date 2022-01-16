import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { HeartBeatService } from 'src/services/heart-beat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  public restInterval = dayjs();
  /**
   *
   */
  constructor(private heartBeatService: HeartBeatService) {

  }
  ngOnInit (): void {
    this.heartBeatService.restIntervalSubject.subscribe(result => {
      this.restInterval = result
      console.log(result);
      console.log('yoyoyo', new Date());
    });
    this.heartBeatService.start();
  }
  title = 'Rest Break Electron';
}
