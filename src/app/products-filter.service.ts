import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsFilterService {

  private currentCategories = new BehaviorSubject<any>(null);

  constructor() { }

  get selectedCategories() {
    return this.currentCategories.asObservable();
  }

  set selectedCategories(value) {
    this.currentCategories.next(value);
  }
}
