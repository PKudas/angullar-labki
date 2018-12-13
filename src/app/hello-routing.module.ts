import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KoszykComponent } from './koszyk/koszyk.component';
import { ProductsComponent } from './products/products.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuard } from './authguard.service';

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
    component: AdminPanelComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HelloRoutingModule { }
