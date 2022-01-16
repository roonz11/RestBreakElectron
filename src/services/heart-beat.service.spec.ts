import { TestBed } from '@angular/core/testing';

import { HeartBeatService } from './heart-beat.service';

describe('HeartBeatService', () => {
  let service: HeartBeatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeartBeatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
