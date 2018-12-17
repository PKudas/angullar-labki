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
import { NodeProductService } from '../node-product.service';
import { ProductsFilterService } from '../products-filter.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  admin = true;
  products: Product[];
  productsObservable: Observable<any>;
  loading: boolean;
  currentFilters = this.productFilterService.selectedFilters;

  categories = [
    { name: 'Lustrzanki', checked: false },
    { name: 'Bezlusterkowce', checked: false },
    { name: 'Kompaktowe', checked: false }
  ];

  constructor(private productService: NodeProductService, private modalService: NgbModal,
    private paginationService: PaginationService, private productFilterService: ProductsFilterService) { }

  ngOnInit() {
    this.productService.getLoadingDataStatus().subscribe(s => {
      this.loading = s;
    });
    this.currentFilters.subscribe(filters => {
      this.productService.getProducts(filters).subscribe((p: any) => {
        this.products = p.docs;
        this.paginationService.loaded(p.pages);
      });
    });
    // this.productService.getLoadedPageCount().subscribe(value => this.paginationService.loaded(value));
  }

  openFormModal() {
    const modalRef = this.modalService.open(NewProduktComponent);
    modalRef.result.then((result) => {
      this.productService.addProduct(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  onDeleted(product: Product) {
    this.productService.deleteProduct(product);
  }

}
