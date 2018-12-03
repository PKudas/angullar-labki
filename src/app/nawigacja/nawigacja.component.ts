import { Component, OnInit } from '@angular/core';
import { KoszykService } from '../koszyk.service';
import { Product } from '../Product';

@Component({
  selector: 'app-nawigacja',
  templateUrl: './nawigacja.component.html',
  styleUrls: ['./nawigacja.component.css']
})
export class NawigacjaComponent implements OnInit {

  basketContent: Product[] = [];
  productCount = 0;
  costs = 0.00;

  constructor(private koszykService: KoszykService) { }

  ngOnInit() {
    this.basketContent = this.koszykService.getContent();
    this.refreshContent();
    this.koszykService.basketChanged.subscribe(content => {
      this.basketContent = content;
      this.refreshContent();
    });
  }

  refreshContent() {
    this.productCount = 0;
    this.costs = 0.00;
    let quantity = 0;
    let costs = 0.00;
    for (const product of this.basketContent) {
      costs = costs + (product.quantity * product.price);
      quantity = quantity + product.quantity;
    }
    this.costs = costs;
    this.productCount = quantity;
  }
}
