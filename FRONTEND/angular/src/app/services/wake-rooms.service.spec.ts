import { TestBed } from '@angular/core/testing';

import { WakeRoomsService } from './wake-rooms.service';

describe('WakeRoomsService', () => {
  let service: WakeRoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WakeRoomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
