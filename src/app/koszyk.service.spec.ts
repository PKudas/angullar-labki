import { TestBed, inject } from '@angular/core/testing';

import { KoszykService } from './koszyk.service';

describe('KoszykService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KoszykService]
    });
  });

  it('should be created', inject([KoszykService], (service: KoszykService) => {
    expect(service).toBeTruthy();
  }));
});
