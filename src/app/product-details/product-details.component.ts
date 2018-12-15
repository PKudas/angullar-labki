import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { KoszykService } from '../koszyk.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product;
  orderedCount = 1;

  constructor(private koszykService: KoszykService) { }

  ngOnInit() {
  }

  checkCount() {
    console.log(this.orderedCount);
    if (this.orderedCount < 1) {
      return true;
    } else if (this.orderedCount > this.product.quantity) {
      return true;
    } else {
      return false;
    }
  }

  addToBasket() {
    const q = +this.orderedCount;
    this.product.quantity = this.product.quantity - q;
    this.koszykService.addProduct({
      id: this.product.id, name: this.product.name, category: this.product.category,
      price: this.product.price, quantity: q,
      description: this.product.description, link: this.product.link, max: this.product.quantity + q
    });
  }

}
