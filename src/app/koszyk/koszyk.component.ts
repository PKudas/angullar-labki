import { Component, OnInit } from '@angular/core';
import { KoszykService } from '../koszyk.service';
import { Product } from '../Product';
import { ProductService } from '../product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderConfirmationComponent } from '../order-confirmation/order-confirmation.component';
import { OrderService } from '../order.service';
import { NodeProductService } from '../node-product.service';
import { NodeOrderService } from '../node-order.service';
@Component({
  selector: 'app-koszyk',
  templateUrl: './koszyk.component.html',
  styleUrls: ['./koszyk.component.css']
})
export class KoszykComponent implements OnInit {

  basketContent = [];
  basketPrice = 0.00;
  constructor(private koszykService: KoszykService, private productService: NodeProductService,
     private modalService: NgbModal, private orderService: NodeOrderService) { }

  ngOnInit() {
    this.basketContent = this.koszykService.getContent();
    this.refreshBasketState();
  }

  openFormModal() {
    const modalRef = this.modalService.open(OrderConfirmationComponent);
    modalRef.result.then((result) => {
      const items = [];
      this.basketContent.forEach(p => items.push({_id: p._id, name: p.name, link: p.link, price: p.price, quantity: p.quantity}));
      this.orderService.addOrder({status: true, name: result.name, address: result.address, items: items, price: this.basketPrice});
      this.koszykService.emptyBasket();
      this.basketContent = [];
      this.basketPrice = 0.00;
    }).catch((error) => {
      console.log(error);
    });
  }
  incProduct(product) {
    this.koszykService.addProduct({_id: product._id, name: product.name, quantity: 1,
      price: product.price, description: product.description, link: product.link, max: product.max});
    product.quantity = product.quantity + 1;
    this.basketPrice = this.basketPrice + product.price;
  }

  decProduct(product) {
    this.koszykService.deleteProduct(product);
    product.quantity = product.quantity - 1;
    this.basketPrice = this.basketPrice - product.price;
  }

  removeProducts(product) {
    this.koszykService.removeGivenProducts(product);
    this.basketContent = this.koszykService.getContent();
    this.basketPrice = 0.00;
    this.basketContent.forEach(p => this.basketPrice = this.basketPrice + p.quantity * p.price);
  }

  sprawdz(v) {
    console.log(v);
    return true;
  }

  refreshBasketState() {
    this.basketContent.forEach(p => {
      this.productService.getProduct(p._id).subscribe(v => {
        const dbProduct = v as any;
        if (dbProduct.price !== p.price) {
          if (dbProduct.quantity < p.quantity) {
            p.quantity = dbProduct.quantity;
            p.max = dbProduct.quantity;
          }
          p.price = dbProduct.price;
          this.koszykService.updateProductInBasket(p);
        }
        if (dbProduct.quantity < p.quantity) {
          p.quantity = dbProduct.quantity;
          p.max = dbProduct.quantity;
          this.koszykService.updateProductInBasket(p);
        }
        this.basketPrice = this.basketPrice + p.quantity * p.price;
      });
    });
  }
}
