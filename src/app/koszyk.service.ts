import { Injectable, Output, EventEmitter } from '@angular/core';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class KoszykService {

  @Output() basketChanged: EventEmitter<Product[]> = new EventEmitter();

  constructor() { }

  emptyBasket() {
    localStorage.clear();
    this.basketChanged.emit(this.getContent());
  }

  addProduct(product) {
    const storageItem = localStorage.getItem(product._id);
    if (storageItem != null) {
      const item = JSON.parse(storageItem);
      localStorage.setItem(product._id, JSON.stringify({_id: product._id, name: product.name, quantity: item.quantity + product.quantity,
        price: product.price, description: product.description, link: product.link, max: product.max}));
    } else {
      localStorage.setItem(product._id, JSON.stringify({_id: product._id, name: product.name, quantity: product.quantity,
        price: product.price, description: product.description, link: product.link, max: product.max}));
    }
    this.basketChanged.emit(this.getContent());
  }

  deleteProduct(product) {
    const storageItem = localStorage.getItem(product._id);
    const item = JSON.parse(storageItem);
    item.quantity = item.quantity - 1;
    localStorage.setItem(product._id, JSON.stringify(item));
    this.basketChanged.emit(this.getContent());
  }

  removeGivenProducts(product) {
    localStorage.removeItem(product._id);
    this.basketChanged.emit(this.getContent());
  }

  updateProductInBasket(product) {
    localStorage.setItem(product._id, JSON.stringify(product));
  }

  getContent() {
    const basketContent = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const product = JSON.parse(localStorage.getItem(key));
      basketContent.push(product);
    }
    return basketContent;
  }
}
