import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KoszykComponent } from './koszyk/koszyk.component';

const routes: Routes = [
  {
    path: 'koszyk',
    component: KoszykComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HelloRoutingModule { }
