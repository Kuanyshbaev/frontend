import { Component, OnInit } from '@angular/core';
import {ProductService} from "../service/product.service";
import {ProductModel} from "../model/product.model";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  cartProducts: ProductModel[] = [];

  constructor(private productService: ProductService) {
    this.productService.productListSubject.subscribe(products => {
      this.cartProducts = products;
    });
  }

  ngOnInit(): void {
  }

  getProductTotalSum() {
    let sum = 0;

    for (let cartProduct of this.cartProducts) {
      sum += cartProduct.price * cartProduct.amount;
    }

    return sum;
  }

  removeProduct(product: ProductModel) {
    this.productService.removeProduct(product);
  }

}
