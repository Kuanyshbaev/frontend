import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from "./product-list/product-list.component";
import {OrderPageComponent} from "./order-page/order-page.component";
import {OrderConfirmationComponent} from "./order-confirmation/order-confirmation.component";
import {EditProductsComponent} from "./edit-products/edit-products.component";

const routes: Routes = [
  {
    path: 'order', component: OrderPageComponent
  },
  {
    path: 'order-confirmation', component: OrderConfirmationComponent
  },
  {
    path: 'edit-products', component: EditProductsComponent
  },
  {
    path: '**', component: ProductListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
