import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  // tslint:disable-next-line: ban-types
  product: Object = new Object();
  productId;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = this.categoryService.getCategories();
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productService
        .get(this.productId)
        .pipe(take(1))
        .subscribe(p => (this.product = p));
    }
  }

  save(product) {
    if (this.productId) {
      this.productService.update(this.productId, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) { return; }

    this.productService.delete(this.productId);
    this.router.navigate(['admin/products']);
  }
  ngOnInit() {}
}
