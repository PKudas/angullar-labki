import { Injectable, Output, EventEmitter } from '@angular/core';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class KoszykService {

  @Output() basketChanged: EventEmitter<Product[]> = new EventEmitter();

  constructor() { }

  addProduct(product: Product) {
    const storageItem = localStorage.getItem(product.name);
    if (storageItem != null) {
      const item = JSON.parse(storageItem);
      localStorage.setItem(product.name, JSON.stringify({name: product.name, quantity: item.quantity + 1,
        price: product.price, description: product.description, link: product.link}));
    } else {
      localStorage.setItem(product.name, JSON.stringify(product));
    }
    this.basketChanged.emit(this.getContent());
  }

  getContent() {
    const basketContent: Product[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const product = JSON.parse(localStorage.getItem(key));
      basketContent.push(product);
    }
    return basketContent;
  }
}
