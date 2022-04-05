import {ProductModel} from "../model/product.model";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class ProductService {
    private productList: ProductModel[] = [];
    productListSubject = new BehaviorSubject<ProductModel[]>([]);

    constructor(private http: HttpClient) {
        const productListStr = localStorage.getItem('products');

        if (productListStr) {
            const obj: [] = JSON.parse(productListStr);

            obj.forEach(item => this.productList.push(item));
        }

        this.productListSubject.next(this.productList);
    }

    public getProductList(): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>('/api/product/list');
    }

    public makeOrder(products: ProductModel[]): Observable<any> {
        return this.http.post('/api/product/make_order', products);
    }

    public saveProduct(product: ProductModel) {
        return this.http.post('api/product/add_product', product);
    }

    public deleteProduct(id: number) {
        return this.http.delete(`api/product/delete_product/${id}`);
    }

    public addProduct(product: ProductModel) {
        if (this.productList.indexOf(product) == -1) {
            this.productList.push(product);

            this.productListSubject.next(this.productList);
            localStorage.setItem('products', JSON.stringify(this.productList));
        }
    }

    public removeProduct(product: ProductModel) {
        let idx = -1;
        for (let i = 0; i < this.productList.length; i++) {
            if (product.id == this.productList[i].id) {
                idx = i;
            }
        }

        if (idx > -1) {
            this.productList.splice(idx, 1);

            this.productListSubject.next(this.productList);
            localStorage.setItem('products', JSON.stringify(this.productList));
        }
    }

    public clearProductsList() {
        this.productList = [];

        this.productListSubject.next(this.productList);
        localStorage.removeItem('products');
    }
}
