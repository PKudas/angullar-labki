import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  panelOpenState = false;
  orders;

  constructor(private authService: AuthService, private orderService: OrderService) { }

  ngOnInit() {
    this.orders = this.orderService.orders;
  }

  calc(items) {
    let price = 0.00;
    items.forEach(i => { price = price + i.quantity * i.price; });
    return price;
  }

  confirm(id, items) {
    this.orderService.confirmOrder(id, items);
  }

}
