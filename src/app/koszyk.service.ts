import { Injectable, Output, EventEmitter  } from '@angular/core';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class KoszykService {

  @Output() productAdded: EventEmitter<string> = new EventEmitter();
  
  constructor() { }

  addProduct(productInfo) {
    this.productAdded.emit("productInfo");
  }
}
