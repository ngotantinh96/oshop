import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$;
  categories$;

  constructor(private productService: ProductService, private categoryService: CategoryService) {
    this.products$ = this.productService.getAll();
    this.categories$ = this.categoryService.getAll();
  }
}
