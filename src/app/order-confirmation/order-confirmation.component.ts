import { Component, OnInit } from '@angular/core';
import {ProductModel} from "../model/product.model";
import {ProductService} from "../service/product.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  cartProducts: ProductModel[] = [];

  constructor(private productService: ProductService,
              private router: Router) {
    this.productService.productListSubject.subscribe(products => {
      this.cartProducts = products;
    });
  }

  ngOnInit(): void {
  }

  accept() {
    this.productService.makeOrder(this.cartProducts).subscribe(() => {
      this.productService.clearProductsList();

      this.router.navigate(['/']);
    });
  }

  getProductTotalSum() {
    let sum = 0;

    for (let cartProduct of this.cartProducts) {
      sum += cartProduct.price * cartProduct.amount;
    }

    return sum;
  }

}
