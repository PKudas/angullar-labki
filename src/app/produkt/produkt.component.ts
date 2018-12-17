import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '../Product';
import { KoszykService } from '../koszyk.service';
import { ProductService } from '../product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { NodeProductService } from '../node-product.service';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';
import { PromotionService } from '../promotion.service';
import { PromotionComponent } from '../promotion/promotion.component';
import { PromotionGetterService } from '../promotion-getter.service';

@Component({
  selector: 'app-produkt',
  templateUrl: './produkt.component.html',
  styleUrls: ['./produkt.component.css']
})
export class ProduktComponent implements OnInit {

  @Input() admin: boolean;
  @Input() product: Product;
  socket = socketIo('http://localhost:3000');
  oldPrice;
  newPrice;
  activePromotion = false;

  addToBasket() {
    this.product.quantity--;
    this.koszykService.addProduct({
      _id: this.product._id, name: this.product.name, category: this.product.category,
      price: this.product.price, quantity: 1,
      description: this.product.description, link: this.product.link, max: this.product.quantity + 1
    });
  }

  constructor(private koszykService: KoszykService, private productService: NodeProductService,
     private modalService: NgbModal, private promotionService: PromotionService, private promotionGetterService: PromotionGetterService) {
   }

  ngOnInit() {
    this.oldPrice = this.product.price;
    console.log('polaczono z websocketem...');
    this.promotionGetterService.getPromotion(this.product._id).subscribe((prom: any) => {
      console.log(prom);
      this.product.price = prom.newPrice;
      this.newPrice = prom.newPrice;
      this.oldPrice = prom.oldPrice;
      this.activePromotion = true;
    }, error => {
      console.log('Promotion not found');
    });
    this.promotionService.promotion.subscribe(data => {
      if (data._id === this.product._id) {
        if (data.active) {
        this.product.price = data.newPrice;
        this.newPrice = data.newPrice;
        this.activePromotion = true;
        } else {
          this.product.price = data.oldPrice;
          this.newPrice = null;
          this.activePromotion = false;
        }
      }
    });
  }

  editProduct() {
    const modalRef = this.modalService.open(EditProductComponent);
    modalRef.componentInstance.product = this.product;
    modalRef.result.then((result) => {
      this.productService.updateProduct({_id: this.product._id, ...result});
    }).catch((error) => {
      console.log(error);
    });
  }

  showDetails() {
    const modalRef = this.modalService.open(ProductDetailsComponent, { size: 'lg' });
    modalRef.componentInstance.product = this.product;
  }

  addPromotion() {
    const modalRef = this.modalService.open(PromotionComponent, { size: 'lg' });
    modalRef.result.then((result) => {
      this.socket.emit('promotion', {_id: this.product._id, newPrice: result.newPrice, oldPrice: this.product.price,
         length: result.length });
    });
  }
}
