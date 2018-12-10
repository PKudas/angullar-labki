import { Component, OnInit, Input } from '@angular/core';
import { ProductsFilterService } from '../products-filter.service';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {

  @Input() categories;

  constructor(private productsFilterService: ProductsFilterService) { }

  ngOnInit() {
  }

  onChange() {
    this.productsFilterService.selectedCategories = this.categories
    .filter(category => category.checked)
    .map(category => category.name);
  }

}
