import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: any[] = [];
  filteredProducts: any[] = [];
  category: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.productService
      .getAll()
      .pipe(
        switchMap(products => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe(x => {
        this.category = x.get('category');

        this.filteredProducts = this.category
          ? this.products.filter(p => p.category === this.category)
          : this.products;
      });
  }
}
