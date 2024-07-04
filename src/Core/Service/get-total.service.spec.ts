import { TestBed } from '@angular/core/testing';

import { GetTotalService } from './get-total.service';

describe('GetTotalService', () => {
  let service: GetTotalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTotalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
