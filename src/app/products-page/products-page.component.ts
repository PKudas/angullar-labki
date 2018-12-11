import { Component, OnInit, Input } from '@angular/core';
import { PaginationService } from '../pagination.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  show = false;
  pageCount;

  constructor(private paginationService: PaginationService) { }

  ngOnInit() {
    this.paginationService.pageCountLoaded.subscribe(count => {
      this.pageCount = 5;
      this.show = true;
    });
  }

}
