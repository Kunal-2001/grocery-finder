import { TestBed } from '@angular/core/testing';

import { ItemsearchService } from './itemsearch.service';

describe('ItemsearchService', () => {
  let service: ItemsearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
