import { ProductService } from "./../../product.service";
import { CategoryService } from "./../../category.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  categories$;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = categoryService.getCategories();
  }

  save(product) {
    this.productService.create(product);
  }
  ngOnInit() {}
}
