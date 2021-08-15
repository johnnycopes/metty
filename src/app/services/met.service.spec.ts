import { TestBed } from '@angular/core/testing';

import { MetService } from './met.service';

describe('MetService', () => {
  let service: MetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
