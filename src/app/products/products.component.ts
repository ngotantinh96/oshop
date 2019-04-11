import { ProductService } from './../product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll();
  }
}
