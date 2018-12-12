import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsFilterService {

  private currentFilters = new BehaviorSubject<any>([null, null, 1]);
  private currentCategories;
  private currentSearchInput;
  private currentPage = 1;

  constructor() { }

  get selectedFilters() {
    return this.currentFilters.asObservable();
  }

  updateCurrentPage(value) {
    this.currentPage = value;
    this.currentFilters.next([this.currentSearchInput, this.currentCategories, value]);
  }

  updateSearchInput(value) {
    this.currentSearchInput = value;
    this.currentFilters.next([value, this.currentCategories, this.currentPage]);
  }

  set selectedCategories(value) {
    this.currentCategories = value;
    this.currentFilters.next([this.currentSearchInput, value, this.currentPage]);
  }

  get selectedPage() {
    return this.currentPage;
  }
}
