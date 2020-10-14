import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { SelectComponent } from './components/select/select.component';

import { HeaderFixedDirective } from './directives/header-fixed.directive';
import { ToggleClassDirective } from './directives/toggle-class.directive';

import { Ng5SliderModule } from 'ng5-slider';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductSingleComponent } from './pages/product-single/product-single.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderFixedDirective,
    HeaderComponent,
    ToggleClassDirective,
    ProductListComponent,
    HomeComponent,
    SelectComponent,
    ProductSingleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // 3rd Party
    SlickCarouselModule,
    Ng5SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
