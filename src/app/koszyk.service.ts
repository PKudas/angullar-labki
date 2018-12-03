import { Injectable, Output, EventEmitter  } from '@angular/core';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class KoszykService {

  @Output() productAdded: EventEmitter<string> = new EventEmitter();
  basketContent: Product[] = [];
  
  constructor() { }

  addProduct(product: Product) {
    let index = this.basketContent.findIndex(productValue => productValue.name == product.name);
    if(index != -1) {
      this.basketContent[index].quantity = this.basketContent[index].quantity + 1;
    }
    else {
      this.basketContent.push(product);
    }
  }

  getContent() {
    return this.basketContent;
  }
}
