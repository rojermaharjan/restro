import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { HeaderFixedDirective } from './directives/header-fixed.directive';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ToggleClassDirective } from './directives/toggle-class.directive';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderFixedDirective,
    HeaderComponent,
    ToggleClassDirective,
    ProductListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // 3rd Party
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
