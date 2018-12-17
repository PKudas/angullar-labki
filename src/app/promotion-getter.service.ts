import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionGetterService {


  endpoint = 'http://localhost:3000/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getPromotion(_id) {
    return this.http.get(this.endpoint + 'promotions/' + _id).pipe(
      map(this.extractData)
    );
  }
}
