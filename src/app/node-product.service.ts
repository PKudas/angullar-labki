import { Injectable } from '@angular/core';
import { Product } from './Product';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { map, switchMap, filter, take, tap, catchError } from 'rxjs/operators';
import { ProductsFilterService } from './products-filter.service';
import { Query } from '@firebase/firestore-types';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NodeProductService {
  private products$: AngularFirestoreCollection<any>;
  private currentPage = 1;
  private productsOnPage = 6;
  private pageCountSubject: Subject<any> = new Subject();
  const endpoint = 'http://localhost:3000/';
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private productsFilterService: ProductsFilterService) {
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  get products() {
    return this.http.get(this.endpoint + 'products').pipe(
      map(this.extractData)
    );
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

  getProduct(id) {
    return this.http.get(this.endpoint + 'products/' + id).pipe(
      map(this.extractData)
    );
  }

  addProduct(product: Product) {
    console.log(product);
    return this.http.post<any>(this.endpoint + 'products', JSON.stringify(product), this.httpOptions).pipe(
      tap((product) => console.log(`added product w/ id=${product.id}`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }

  deleteProduct(id) {
    return this.http.delete<any>(this.endpoint + 'products/' + id, this.httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }

  updateProductCount(id, count) {
    return this.http.patch(this.endpoint + 'products/' + id, JSON.stringify({quantity: count}), this.httpOptions).pipe(
      tap(_ => console.log(`patched product id=${id}`)),
      catchError(this.handleError<any>('patchProduct'))
    );
  }

  updateProduct(product) {
    const {id, productBody} = product;
    return this.http.put(this.endpoint + 'products/' + id, JSON.stringify(productBody), this.httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
