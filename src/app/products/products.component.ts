import {Component, HostBinding, OnInit} from '@angular/core';
import {Product} from '../Product';
import {ProductService} from '../product.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewProduktComponent} from '../new-produkt/new-produkt.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @HostBinding('class.row') row = true;

  min: number;
  max: number;

  products: Product[] = [];

  shoppingList: Product[] = [];

  constructor(private productService: ProductService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getProducts();
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

  openFormModal() {
    const modalRef = this.modalService.open(NewProduktComponent);

    modalRef.result.then((result) => {
      this.productService.addProduct({ name: result.name, quantity: result.quantity, price: result.price, description: result.description, link: result.link })
    }).catch((error) => {
      console.log(error);
    });
  }

  getProducts(): void {
    this.products = this.productService.getProducts();
  }

  onDeleted(product: Product) {
    this.productService.deleteProduct(product);
  }
}
