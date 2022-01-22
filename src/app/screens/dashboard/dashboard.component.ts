import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { NotificationService } from '../../services/notification.service';
import { HeartBeatService } from '../../services/heart-beat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  public restInterval = dayjs();
  constructor(
    private heartBeatService: HeartBeatService,
    private notificationService: NotificationService
  ) { }

  ngOnInit (): void {
    this.heartBeatService.restIntervalSubject.subscribe((result: dayjs.Dayjs) => {
      this.restInterval = result;
      this.notificationService.showRestNotification();

    });

    //this.startHeartBeat();
  }

  public onStart () {
    this.heartBeatService.start();
  }

  public onStop () {
    this.heartBeatService.stop();
  }

}
