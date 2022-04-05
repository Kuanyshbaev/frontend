import { Component, OnInit } from '@angular/core';
import {ProductService} from "../service/product.service";
import {ProductModel} from "../model/product.model";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: ProductModel[] = [];
  cartProducts: ProductModel[] = [];

  constructor(private productService: ProductService) {
    productService.productListSubject.subscribe(products => {
      this.cartProducts = products;
    });
  }

  ngOnInit(): void {
    this.productService.getProductList().subscribe(response => {
      this.products = response;
    });
  }

  addProductToCart(product: ProductModel) {
    this.productService.addProduct(product);
  }

  removeProductFromCart(product: ProductModel) {
    this.productService.removeProduct(product);
  }

  isProductAddedToCard(product: ProductModel) {
    for (let productModel of this.cartProducts) {
      if (productModel.id == product.id) {
        return true;
      }
    }

    return false;
  }
}
