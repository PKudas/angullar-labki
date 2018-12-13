import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathService {
  private showBasketState = true;

  constructor() { }

  get show() {
    return this.showBasketState;
  }

  set show(value) {
    this.showBasketState = value;
  }
}
