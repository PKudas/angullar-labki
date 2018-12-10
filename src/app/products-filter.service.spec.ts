import { TestBed, inject } from '@angular/core/testing';

import { ProductsFilterService } from './products-filter.service';

describe('ProductsFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsFilterService]
    });
  });

  it('should be created', inject([ProductsFilterService], (service: ProductsFilterService) => {
    expect(service).toBeTruthy();
  }));
});
