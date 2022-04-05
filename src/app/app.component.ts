import { Component } from '@angular/core';
import {ProductService} from "./service/product.service";
import {ProductModel} from "./model/product.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  productList: ProductModel[] = [];

  constructor(private productService: ProductService) {
    this.productService.productListSubject.subscribe(productList => {
      this.productList = productList;
    })
  }

  title = 'frontend';
}
