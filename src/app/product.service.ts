import { Injectable } from '@angular/core';
import { FakeProducts } from './FakeProducts';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getProducts(): Product[] {
    return FakeProducts.products;
  }

  getProduct() {

  }

  addProduct() {

  }

  deleteProduct() {

  }

  constructor() { }
}
