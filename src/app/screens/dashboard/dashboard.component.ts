import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { HeartBeatService } from 'src/services/heart-beat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  public restInterval = dayjs();
  constructor(private heartBeatService: HeartBeatService) { }

  ngOnInit (): void {
    this.heartBeatService.restIntervalSubject.subscribe(result => {
      this.restInterval = result
    });

    this.startHeartBeat();
  }

  public startHeartBeat () {
    this.heartBeatService.start();
  }

  public onStop () {
    this.heartBeatService.stop();
  }

}
