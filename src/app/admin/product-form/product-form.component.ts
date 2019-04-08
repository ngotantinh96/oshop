import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from "./../../product.service";
import { CategoryService } from "./../../category.service";
import { Component, OnInit } from "@angular/core";
import { take } from "rxjs/operators";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  categories$;
  product:Object = new Object();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = this.categoryService.getCategories();
    const productId = this.route.snapshot.paramMap.get("id");
    if (productId)
      this.productService
        .get(productId)
        .pipe(take(1))
        .subscribe(p => this.product = p);
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate["/admin/products"];
  }
  ngOnInit() {}
}
