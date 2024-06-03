import { TestBed } from '@angular/core/testing';

import { CremationService } from './cremation.service';

describe('CremationService', () => {
  let service: CremationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CremationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
