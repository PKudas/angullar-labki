import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HelloComponent } from './hello.component';
import { ProductComponent } from './product/product.component';
import { NaglowekComponent } from './naglowek/naglowek.component';

@NgModule({
  declarations: [
    HelloComponent,
    ProductComponent,
    NaglowekComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [ProductComponent]
})
export class HelloModule { }
