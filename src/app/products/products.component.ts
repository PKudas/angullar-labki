import {Component, HostBinding, OnInit} from '@angular/core';
import {Product} from '../Product';
import {ProductService} from '../product.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewProduktComponent} from '../new-produkt/new-produkt.component';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @HostBinding('class.row') row = true;

  products: Observable<Product[]>;
  categories = [
    {name: 'Lustrzanki', checked: false},
    {name: 'Bezlusterkowce', checked: false},
    {name: 'Kompaktowe', checked: false}
  ];

  constructor(private productService: ProductService, private modalService: NgbModal) { }

  ngOnInit() {
    this.products = this.productService.products;
  }

  openFormModal() {
    const modalRef = this.modalService.open(NewProduktComponent);
//TODO implement adding
    modalRef.result.then((result) => {
    }).catch((error) => {
      console.log(error);
    });
  }

  onDeleted(product: Product) {
    this.productService.deleteProduct(product);
  }
}
