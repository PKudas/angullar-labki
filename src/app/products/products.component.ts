import { Component, HostBinding, OnInit } from '@angular/core';
import { Product } from '../Product';
import { ProductService } from '../product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewProduktComponent } from '../new-produkt/new-produkt.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take, map, filter } from 'rxjs/operators';
import { delay } from 'q';
import { PaginationService } from '../pagination.service';
import { KoszykService } from '../koszyk.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @HostBinding('class.row') row = true;

  products: Product[];
  productsObservable: Observable<Product[]>;
  loading: boolean;

  categories = [
    { name: 'Lustrzanki', checked: false },
    { name: 'Bezlusterkowce', checked: false },
    { name: 'Kompaktowe', checked: false }
  ];

  constructor(private productService: ProductService, private modalService: NgbModal,
    private paginationService: PaginationService, private koszykService: KoszykService) { }

  ngOnInit() {
    this.productService.getLoadingDataStatus().subscribe(s => {
      this.loading = s;
    });
    this.productsObservable = this.productService.products;
    this.productsObservable.subscribe(p => {
      this.products = p;
      this.koszykService.getContent().forEach(prod => {
        const id = prod.id;
        const index = this.products.findIndex(v => v.id === id);
        if (index > -1) {
          this.products[index].quantity = this.products[index].quantity - prod.quantity;
        }
      });
    });
    this.productService.getLoadedPageCount().subscribe(value => this.paginationService.loaded(value));
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
