import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '../Product';
import { KoszykService } from '../koszyk.service';
import { ProductService } from '../product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-produkt',
  templateUrl: './produkt.component.html',
  styleUrls: ['./produkt.component.css']
})
export class ProduktComponent implements OnInit {

  @Input() admin: boolean;
  @Input() product: Product;

  addToBasket() {
    this.product.quantity--;
    this.koszykService.addProduct({
      id: this.product.id, name: this.product.name, category: this.product.category,
      price: this.product.price, quantity: 1,
      description: this.product.description, link: this.product.link, max: this.product.quantity + 1
    });
  }

  constructor(private koszykService: KoszykService, private productService: ProductService, private modalService: NgbModal) { }

  ngOnInit() {
    console.log(this.admin);
  }

  editProduct() {
    const modalRef = this.modalService.open(EditProductComponent);
    modalRef.componentInstance.product = this.product;
    modalRef.result.then((result) => {
      this.productService.updateProduct({id: this.product.id, ...result});
    }).catch((error) => {
      console.log(error);
    });
  }

  showDetails() {
    console.log("AAAAxxxz");
  }
}
