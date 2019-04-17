import { ProductService } from 'shared/services/product.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataTableResource } from 'angular7-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  products: any[];
  subscription: Subscription;
  tableResource: DataTableResource<any>;
  items: any[] = [];
  itemCount;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(products => {
      this.products = products;
      this.initializeTable(products);
    });
  }

  filter(query: string) {
    const filteredProducts = query
      ? this.products.filter(p =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
    this.initializeTable(filteredProducts);
  }

  private initializeTable(products: any[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource
      .query({ offset: 0, limit: 10 })
      .then(items => (this.items = items));
    this.tableResource.count().then(count => (this.itemCount = count));
  }

  reloadItems(params) {
    if (!this.tableResource) {
      return;
    }
    this.tableResource.query(params).then(items => (this.items = items));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
