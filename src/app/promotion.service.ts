import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  promotion: Subject<any> = new Subject();

  constructor() { }

  getPromotion() {
    return this.promotion.asObservable();
  }

  addPromotion(prom) {
    this.promotion.next(prom);
  }
}
