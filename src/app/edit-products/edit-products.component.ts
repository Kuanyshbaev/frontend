import { Component, OnInit } from '@angular/core';
import {ProductModel} from "../model/product.model";
import {ProductService} from "../service/product.service";

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {
  productList: ProductModel[] = [];
  product: ProductModel = new ProductModel();
  addProduct: boolean = false;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProductList().subscribe(products => {
      this.productList = products;
    });
  }

  editProduct(product?: ProductModel) {
    if (product) {
      this.product = Object.assign({}, product);
    } else {
      this.product = new ProductModel();
    }

    this.addProduct = !this.addProduct;
  }

  save() {
    this.productService.saveProduct(this.product).subscribe(() => {
      this.loadProducts();

      this.addProduct = false;
    });
  }

  deleteProduct(product: ProductModel) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.loadProducts();
    });
  }

  cancel() {
    this.addProduct = false;
  }
}
