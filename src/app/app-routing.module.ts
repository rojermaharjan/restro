import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductSingleComponent } from './pages/product-single/product-single.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'product-list',
    component: ProductListComponent
  },
  {
    path: 'product/:slug',
    component: ProductSingleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
