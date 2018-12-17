import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NodeProductService } from './node-product.service';
import { map, tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeOrderService {

  endpoint = 'http://localhost:3000/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private productService: NodeProductService) {
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  get orders() {
    return this.http.get(this.endpoint + 'orders').pipe(
      map(this.extractData));
  }

  addOrder(order) {
    return this.http.post<any>(this.endpoint + 'orders', JSON.stringify(order), this.httpOptions).pipe(
      tap((product) => console.log(`added order w/ id=${product._id}`)),
      catchError(this.handleError<any>('addOrder'))
    ).subscribe(resp => console.log(resp));
  }

  confirmOrder(_id, items) {
    return this.http.patch(this.endpoint + 'orders/' + _id, JSON.stringify({status: false}), this.httpOptions).pipe(
      tap(_ => console.log(`patched order id=${_id}`)),
      catchError(this.handleError<any>('patchOrder'))
    ).subscribe(resp => items.forEach(i => this.productService.updateProductCount(i._id, i.quantity)));
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
