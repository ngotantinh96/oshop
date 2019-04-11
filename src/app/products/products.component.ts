import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories$;
  category: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.productService
      .getAll()
      .subscribe(products => (this.products = products));

    this.categories$ = this.categoryService.getAll();

    this.route.queryParamMap.subscribe(x => {
      this.category = x.get('category');

      this.filteredProducts = this.category
        ? this.products.filter(p => p.category === this.category)
        : this.products;
    });
  }
}
