
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
import { ItemCardTwoComponent } from './components/item-card-two/item-card-two.component';
import { ItemCardThreeComponent } from './components/item-card-three/item-card-three.component';

import { HeaderFixedDirective } from './directives/header-fixed.directive';
import { ToggleClassDirective } from './directives/toggle-class.directive';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductSingleComponent } from './pages/product-single/product-single.component';
import { ContactComponent } from './pages/contact/contact.component';
import { API_URL } from './services';
import { AUTH_ENDPOINT, STORE_SERVICE } from './services/auth.service';
import { environment } from 'src/environments/environment';
import { StoreService, STORE_STATE } from './services/store.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor, TimeoutInterceptor, TokenInterceptor } from './interceptors';
import { AppState } from './store/app.state';
import { TranslateModule } from '@ngx-translate/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
    LoginDialogComponent,
    ContactComponent,
    ItemCardOneComponent,
    ItemCardThreeComponent,
    ItemCardTwoComponent
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    TranslateModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TabsModule,

    // 3rd Party
    SlickCarouselModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: API_URL,
      useValue: environment.api_url,
  },
  {
      provide: AUTH_ENDPOINT,
      useValue: environment.auth_end,
  },
  {
      provide: STORE_SERVICE,
      useExisting: StoreService,
  },
  // {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: TokenInterceptor,
  //     multi: true,
  // },
  {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
  },

  {
      provide: STORE_STATE,
      useValue: AppState(),
  },

  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialogComponent]
})
export class AppModule { }
