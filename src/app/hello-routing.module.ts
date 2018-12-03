import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KoszykComponent } from './koszyk/koszyk.component';
import { ProductsComponent } from './products/products.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'koszyk',
    component: KoszykComponent
  },
  {
    path: 'zamowienie',
    component: OrderConfirmationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HelloRoutingModule { }
