import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '../Product';
import { KoszykService } from '../koszyk.service';

@Component({
  selector: 'app-produkt',
  templateUrl: './produkt.component.html',
  styleUrls: ['./produkt.component.css']
})
export class ProduktComponent implements OnInit {

  @Input() product: Product;
  @Output() deleted = new EventEmitter<Product>();

  getColor(quantity) {
    return quantity <= 3;
  }

  addToBasket() {
    this.product.quantity--;
    this.koszykService.addProduct({ id: this.product.id, name: this.product.name, category: this.product.category,
      price: this.product.price, quantity: 1,
      description: this.product.description, link: this.product.link });
  }

  constructor(private koszykService: KoszykService) { }

  ngOnInit() {
  }
}
