import { TestBed } from '@angular/core/testing';

import { ExecutionServiceService } from './execution-service.service';

describe('ExecutionServiceService', () => {
  let service: ExecutionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExecutionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
