import { TestBed, inject } from '@angular/core/testing';

import { NodeProductService } from './node-product.service';

describe('NodeProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodeProductService]
    });
  });

  it('should be created', inject([NodeProductService], (service: NodeProductService) => {
    expect(service).toBeTruthy();
  }));
});
