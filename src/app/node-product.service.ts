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
  private loadingDataSubject: Subject<boolean> = new Subject();

  endpoint = 'http://localhost:3000/';
  httpOptions = {
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

  getProducts(filters) {
    this.loadingDataSubject.next(true);
    const [searchInput, categories, page] = filters;
    const queryParams = [];
    if (page !== 1) { queryParams.push(['page', page]); }
    if (categories && categories.length > 0) {
      categories.forEach(c => queryParams.push(['category', c]));
    }
    if (searchInput) {
      queryParams.push(['name', searchInput]);
    }
    let query = '';
    if (queryParams.length > 0) {
      const [paramKey, paramValue] = queryParams[0];
      query = '?' + paramKey + '=' + paramValue;
    }
    if (queryParams.length > 1) {
      for (let i = 1; i < queryParams.length; i++) {
        const [paramKey, paramValue] = queryParams[i];
        query = query + '&' + paramKey + '=' + paramValue;
      }
    }
    return this.http.get(this.endpoint + 'products' + query).pipe(
      map(res => {
        this.loadingDataSubject.next(false);
        return this.extractData(res as Response);
      })
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
      tap((product) => console.log(`added product w/ id=${product._id}`)),
      catchError(this.handleError<any>('addProduct'))
    ).subscribe(resp => console.log(resp));
  }

  deleteProduct(id) {
    return this.http.delete<any>(this.endpoint + 'products/' + id, this.httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    ).subscribe(resp => console.log(resp));
  }

  updateProductCount(id, count) {
    return this.http.patch(this.endpoint + 'products/' + id, JSON.stringify({quantity: count}), this.httpOptions).pipe(
      tap(_ => console.log(`patched product id=${id}`)),
      catchError(this.handleError<any>('patchProduct'))
    ).subscribe(resp => console.log(resp));
  }

  updateProduct(product) {
    const {_id, ...productBody} = product;
    return this.http.put(this.endpoint + 'products/' + _id, productBody, this.httpOptions).pipe(
      tap(_ => console.log(`updated product id=${_id}`)),
      catchError(this.handleError<any>('updateProduct'))
    ).subscribe(resp => console.log(resp));
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
