import { TestBed } from '@angular/core/testing';

import { FetchLocationService } from './fetch-location.service';

describe('FetchLocationService', () => {
  let service: FetchLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
