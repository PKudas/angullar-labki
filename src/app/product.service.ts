import { Injectable } from '@angular/core';
import { Product } from './Product';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { map, switchMap, filter } from 'rxjs/operators';
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
    return this.productsFilterService.selectedCategories.pipe(
      switchMap(categories => {
        return this.afs.collection('products').snapshotChanges().pipe(
          map(products => products.filter(p => {
            const data = p.payload.doc.data() as Product;
            if (!categories || categories.length < 1) { return true; }
            return categories.includes(data.category);
          })),
          map(products => products.map(p => {
            const data = p.payload.doc.data() as Product;
              const id = p.payload.doc.id;
              return {id, ...data};
          }))
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
