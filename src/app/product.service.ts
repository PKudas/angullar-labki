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

  getProduct(product: Product) {
   
  }

  addProduct(product: Product) {
    FakeProducts.products.push(product);
  }

  deleteProduct(product: Product) {
    let index = FakeProducts.products.indexOf(product);
    if(index !== -1) {
      FakeProducts.products.splice(index, 1);
    }
  }

  constructor() { }
}
