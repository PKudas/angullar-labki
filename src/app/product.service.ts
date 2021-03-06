import { Injectable } from '@angular/core';
import { Product } from './Product';
import { BehaviorSubject, Subject } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { map, switchMap, filter, take } from 'rxjs/operators';
import { ProductsFilterService } from './products-filter.service';
import { Query } from '@firebase/firestore-types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products$: AngularFirestoreCollection<any>;
  private currentPage = 1;
  private productsOnPage = 6;
  private pageCountSubject: Subject<any> = new Subject();
  private loadingDataSubject: Subject<boolean> = new Subject();

  constructor(private afs: AngularFirestore, private productsFilterService: ProductsFilterService) {
    //this.products$ = this.afs.collection('products');
  }

  get products() {
    return this.productsFilterService.selectedFilters.pipe(
      switchMap(filters => {
        this.loadingDataSubject.next(true);
        return this.afs.collection('products')
        .snapshotChanges().pipe(
          map(products => products.filter(p => {
            const data = p.payload.doc.data() as Product;
            if (!filters) { return true; }
            const [_, categories, m] = filters;
            if (!categories || categories.length < 1) { return true; }
            return categories.includes(data.category);
          })),
          map(products => products.filter(p => {
            const data = p.payload.doc.data() as Product;
            if (!filters) { return true; }
            const [searchInput, _, m] = filters;
            if (!searchInput) { return true; }
            return data.name.toLowerCase().indexOf(searchInput.toLowerCase()) > -1;
          })),
          map(products => products.map(p => {
            const data = p.payload.doc.data() as Product;
            const _id = p.payload.doc.id;
            return {_id, ...data};
          })),
          map(products => {
            this.setProductsCount(products.length);
            const [_, m, currentPage] = filters;
            this.loadingDataSubject.next(false);
            return products.slice((currentPage - 1) * this.productsOnPage, currentPage * this.productsOnPage);
          })
        );
      }));
  }

  pageChanged(pageNumber) {
    this.currentPage = pageNumber;
  }

  setProductsCount(value) {
    this.pageCountSubject.next(Math.ceil(value / this.productsOnPage));
  }

  public getLoadedPageCount() {
    return this.pageCountSubject.asObservable();
  }

  public getLoadingDataStatus() {
    return this.loadingDataSubject.asObservable();
  }

  getProduct(_id) {
    return this.afs.collection('products').doc(_id).get();
  }

  addProduct(product: Product) {
    this.afs.collection('products').add(product);
  }

  deleteProduct(_id) {
    this.afs.collection('products').doc(_id).delete();
  }

  updateProductCount(_id, count) {
    this.afs.collection('products').doc(_id).get().subscribe(p => {
      const prod = p.data();
      const q = prod.quantity;
      this.afs.collection('products').doc(_id).update({ quantity: q - count});
    });
  }

  updateProduct(product) {
    const {_id, ...data} = product;
    this.afs.collection('products').doc(_id).set(data);
  }
}
