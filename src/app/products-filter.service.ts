import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsFilterService {

  private currentFilters = new BehaviorSubject<any>(null);
  private currentCategories;
  private currentSearchInput;

  constructor() { }

  get selectedFilters() {
    return this.currentFilters.asObservable();
  }

  updateSearchInput(value) {
    this.currentSearchInput = value;
    this.currentFilters.next([value, this.currentCategories]);
  }

  set selectedCategories(value) {
    this.currentCategories = value;
    this.currentFilters.next([this.currentSearchInput, value]);
  }
}
