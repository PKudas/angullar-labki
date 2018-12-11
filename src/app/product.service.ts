import { Injectable } from '@angular/core';
import { Product } from './Product';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { map, switchMap, filter, take } from 'rxjs/operators';
import { ProductsFilterService } from './products-filter.service';
import { Query } from '@firebase/firestore-types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products$: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private productsFilterService: ProductsFilterService) {
    //this.products$ = this.afs.collection('products');
  }

  get products() {
    return this.productsFilterService.selectedFilters.pipe(
      switchMap(filters => {
        return this.afs.collection('products').snapshotChanges().pipe(
          map(products => products.filter(p => {
            const data = p.payload.doc.data() as Product;
            if (!filters) { return true; }
            const [_, categories] = filters;
            if (!categories || categories.length < 1) { return true; }
            return categories.includes(data.category);
          })),
          map(products => products.filter(p => {
            const data = p.payload.doc.data() as Product;
            if (!filters) { return true; }
            const [searchInput, _] = filters;
            if (!searchInput) { return true; }
            return data.name.toLowerCase().indexOf(searchInput.toLowerCase()) > -1;
          })),
          map(products => products.map(p => {
            const data = p.payload.doc.data() as Product;
            const id = p.payload.doc.id;
            return {id, ...data};
          })),
          take(1)
        );
      }));
  }

  getProduct(product: Product) {

  }

  addProduct(product: Product) {
  }

  deleteProduct(product: Product) {
  }
}
