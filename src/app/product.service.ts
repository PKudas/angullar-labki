import { Injectable } from '@angular/core';
import { Product } from './Product';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private currentCategories = new BehaviorSubject<any>(null);
  private products$: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.products$ = this.afs.collection('products');
   }

  get products() {
    return this.products$.snapshotChanges().pipe(
      map(products => products.map(p => {
        const data = p.payload.doc.data() as Product;
          console.log(data);
          const id = p.payload.doc.id;
          return {id, ...data};
      }))
    );
  }

  getProduct(product: Product) {
   
  }

  addProduct(product: Product) {
  }

  deleteProduct(product: Product) {
  }
}
