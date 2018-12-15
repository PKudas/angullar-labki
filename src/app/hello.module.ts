import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { HelloComponent } from './hello.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NaglowekComponent } from './naglowek/naglowek.component';
import { ProduktComponent } from './produkt/produkt.component';
import { NewProduktComponent } from './new-produkt/new-produkt.component';
import { KoszykComponent } from './koszyk/koszyk.component';
import { HelloRoutingModule } from './/hello-routing.module';
import { NawigacjaComponent } from './nawigacja/nawigacja.component';
import { ProductsComponent } from './products/products.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { CategorySelectorComponent } from './category-selector/category-selector.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { RoleAtuthenticationComponent } from './role-atuthentication/role-atuthentication.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AmdinPanelComponent } from './amdin-panel/amdin-panel.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { EditProductComponent } from './edit-product/edit-product.component';

@NgModule({
  declarations: [
    HelloComponent,
    DashboardComponent,
    NaglowekComponent,
    ProduktComponent,
    NewProduktComponent,
    KoszykComponent,
    NawigacjaComponent,
    ProductsComponent,
    OrderConfirmationComponent,
    AdminOrdersComponent,
    CategorySelectorComponent,
    SearchProductComponent,
    ProductsPageComponent,
    LoadingSpinnerComponent,
    AdminLoginComponent,
    AdminNavComponent,
    EditProductsComponent,
    RoleAtuthenticationComponent,
    AdminProductsComponent,
    AmdinPanelComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    HelloRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [DashboardComponent],
  entryComponents: [
    NewProduktComponent,
    OrderConfirmationComponent,
    RoleAtuthenticationComponent,
    EditProductComponent
  ]
})
export class HelloModule { }
