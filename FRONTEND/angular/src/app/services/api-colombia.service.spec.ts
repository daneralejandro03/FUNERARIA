import { TestBed } from '@angular/core/testing';

import { ApiColombiaService } from './api-colombia.service';

describe('ApiColombiaService', () => {
  let service: ApiColombiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiColombiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
