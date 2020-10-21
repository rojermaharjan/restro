import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { TabsModule } from './components/tab/tabs.module';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { SelectComponent } from './components/select/select.component';
import { ItemCardOneComponent } from './components/item-card-one/item-card-one.component';

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
    ProductSingleComponent,
    ItemCardOneComponent,
    LoginDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule,

    // 3rd Party
    SlickCarouselModule,
    Ng5SliderModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialogComponent]
})
export class AppModule { }
