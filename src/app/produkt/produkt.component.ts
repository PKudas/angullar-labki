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

  addToBasket() {
    this.product.quantity--;
    this.koszykService.addProduct({ id: this.product.id, name: this.product.name, category: this.product.category,
      price: this.product.price, quantity: 1,
      description: this.product.description, link: this.product.link, max: this.product.quantity + 1});
  }

  constructor(private koszykService: KoszykService) { }

  ngOnInit() {
  }
}
