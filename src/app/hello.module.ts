import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HelloComponent } from './hello.component';
import { ProductComponent } from './product/product.component';
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

@NgModule({
  declarations: [
    HelloComponent,
    ProductComponent,
    NaglowekComponent,
    ProduktComponent,
    NewProduktComponent,
    KoszykComponent,
    NawigacjaComponent,
    ProductsComponent,
    OrderConfirmationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    HelloRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [ProductComponent],
  entryComponents: [
    NewProduktComponent
  ]
})
export class HelloModule { }
