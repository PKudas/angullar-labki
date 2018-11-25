import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  getColor(quantity) {
    return quantity <= 3;
  }

  min : number;
  max : number;

  products: Product[] = [
    { name: "Test1", quantity: 10, price: 1.00, description: "Testowy opis", link:"http://focustoinfinity.pl/wp-content/uploads/2018/08/159-Jaki-wybra%C4%87-aparat-01-1024x576.jpg"},
    { name: "Test2", quantity: 10, price: 2.00, description: "Testowy opis", link:"http://focustoinfinity.pl/wp-content/uploads/2018/08/159-Jaki-wybra%C4%87-aparat-01-1024x576.jpg"},
    { name: "Test3", quantity: 10, price: 3.00, description: "Testowy opis", link:"http://focustoinfinity.pl/wp-content/uploads/2018/08/159-Jaki-wybra%C4%87-aparat-01-1024x576.jpg"},
    { name: "Test4", quantity: 10, price: 4.00, description: "Testowy opis", link:"http://focustoinfinity.pl/wp-content/uploads/2018/08/159-Jaki-wybra%C4%87-aparat-01-1024x576.jpg"},
    { name: "Test5", quantity: 10, price: 5.00, description: "Testowy opis", link:"http://focustoinfinity.pl/wp-content/uploads/2018/08/159-Jaki-wybra%C4%87-aparat-01-1024x576.jpg"},
    { name: "Test6", quantity: 10, price: 6.00, description: "Testowy opis", link:"http://focustoinfinity.pl/wp-content/uploads/2018/08/159-Jaki-wybra%C4%87-aparat-01-1024x576.jpg"},
    { name: "Test7", quantity: 10, price: 7.00, description: "Testowy opis", link:"http://focustoinfinity.pl/wp-content/uploads/2018/08/159-Jaki-wybra%C4%87-aparat-01-1024x576.jpg"},
    { name: "Test8", quantity: 10, price: 8.00, description: "Testowy opis", link:"http://focustoinfinity.pl/wp-content/uploads/2018/08/159-Jaki-wybra%C4%87-aparat-01-1024x576.jpg"}
  ];

  shoppingList: Product[] = [];

  test = "Product test";

  constructor() { }

  ngOnInit() {
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
}
