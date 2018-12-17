import { TestBed, inject } from '@angular/core/testing';

import { NodeOrderService } from './node-order.service';

describe('NodeOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodeOrderService]
    });
  });

  it('should be created', inject([NodeOrderService], (service: NodeOrderService) => {
    expect(service).toBeTruthy();
  }));
});
