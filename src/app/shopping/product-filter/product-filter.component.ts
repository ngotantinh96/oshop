import { Component, Input } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$;
  @Input('category'.toString()) category;

  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getAll();
  }
}
