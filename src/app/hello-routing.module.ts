import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KoszykComponent } from './koszyk/koszyk.component';
import { ProductsComponent } from './products/products.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuard } from './authguard.service';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { RoleguardService } from './roleguard.service';

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
    path: 'admin',
    component: AdminOrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent
  },
  {
    path: 'admin/produkty',
    component: AdminProductsComponent,
    canActivate: [RoleguardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HelloRoutingModule { }
