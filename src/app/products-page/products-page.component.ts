import { Component, OnInit, Input } from '@angular/core';
import { PaginationService } from '../pagination.service';
import { ProductService } from '../product.service';
import { ProductsFilterService } from '../products-filter.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  show = false;
  pageCount;
  currentPage;
  constructor(private paginationService: PaginationService, private productsFilterService: ProductsFilterService) { }

  ngOnInit() {
    this.currentPage = this.productsFilterService.selectedPage;
    this.paginationService.pageCountLoaded.subscribe(count => {
      if (this.currentPage > count) {
        if (count > 0) {
          this.first();
        } else {
          this.currentPage = 1;
        }
      }
      this.pageCount = count;
      this.show = true;
    });
  }

  previous() {
    this.currentPage = this.currentPage - 1;
    this.productsFilterService.updateCurrentPage(this.currentPage);
  }

  next() {
    this.currentPage = this.currentPage + 1;
    this.productsFilterService.updateCurrentPage(this.currentPage);
  }

  first() {
    this.currentPage = 1;
    this.productsFilterService.updateCurrentPage(this.currentPage);
  }

  last() {
    this.currentPage = this.pageCount;
    this.productsFilterService.updateCurrentPage(this.currentPage);
  }

  showSecDots() {
    if (this.pageCount > 2) {
      if (this.currentPage >= this.pageCount - 1) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  showLast() {
    if (this.pageCount > 1) {
      if (this.currentPage === this.pageCount) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

}
