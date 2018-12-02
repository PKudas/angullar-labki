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
  @Input() max: number;
  @Input() min: number;
  @Output() deleted = new EventEmitter<Product>();

  getColor(quantity) {
    return quantity <= 3;
  }

  addToBasket() {
    console.log("dodano")
    this.product.quantity--
    this.koszykService.addProduct({name: this.product.name, price: this.product.price});
  }

  constructor(private koszykService: KoszykService) { }

  ngOnInit() {
  }
}
