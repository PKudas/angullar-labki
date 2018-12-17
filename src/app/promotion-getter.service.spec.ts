import { TestBed, inject } from '@angular/core/testing';

import { PromotionGetterService } from './promotion-getter.service';

describe('PromotionGetterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromotionGetterService]
    });
  });

  it('should be created', inject([PromotionGetterService], (service: PromotionGetterService) => {
    expect(service).toBeTruthy();
  }));
});
