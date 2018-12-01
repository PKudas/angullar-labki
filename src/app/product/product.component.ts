import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  min : number;
  max : number;

  products: Product[] = [];

  shoppingList: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
    for (let product of this.products) {
      if (this.min == null && this.max == null) {
        this.min = product.price;
        this.max = product.price;
      }
      if (product.price < this.min) {
        this.min = product.price;
      }
      if (product.price > this.max) {
        this.max = product.price;
      }
    }
  }

  getProducts(): void {
    this.products = this.productService.getProducts();
  }

  onDeleted(product: Product) {
    let index = this.products.indexOf(product);
    if(index !== -1) {
      this.products.splice(index, 1);
    }
  }
}
