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
import * as socketIo from 'socket.io-client';
import { PromotionService } from '../promotion.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @HostBinding('class.row') row = true;

  admin = false;
  products: Product[];
  productsObservable: Observable<any>;
  loading: boolean;
  currentFilters = this.productFilterService.selectedFilters;
  socket = socketIo('http://localhost:3000');

  categories = [
    { name: 'Lustrzanki', checked: false },
    { name: 'Bezlusterkowce', checked: false },
    { name: 'Kompaktowe', checked: false }
  ];

  constructor(private productService: NodeProductService, private modalService: NgbModal,
    private paginationService: PaginationService, private koszykService: KoszykService,
    private productFilterService: ProductsFilterService, private promotionService: PromotionService) { }

  ngOnInit() {
    this.productService.getLoadingDataStatus().subscribe(s => {
      this.loading = s;
    });
    this.currentFilters.subscribe(filters => {
      this.productService.getProducts(filters).subscribe((p: any) => {
        this.products = p.docs;
        this.paginationService.loaded(p.pages);
        this.koszykService.getContent().forEach(prod => {
          const _id = prod._id;
          const index = this.products.findIndex(v => v._id === _id);
          if (index > -1) {
            this.products[index].quantity = this.products[index].quantity - prod.quantity;
          }
        });
      });
    });
    this.socket.on('receive-promotion', (data) => {
      this.promotionService.addPromotion(data);
    });
    //this.productService.getLoadedPageCount().subscribe(value => this.paginationService.loaded(value));
  }
}
