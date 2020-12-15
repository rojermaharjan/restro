import { Injectable } from '@angular/core';
import { BaseService, RestService } from '../services';
import { initListState } from '../services/contracts/component.state';
import { StoreService } from '../services/store.service';
import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<IProduct> {
  constructor(store: StoreService, rest: RestService) {
    super(store, rest, 'products');
    this.store.set('products', initListState<IProduct>());
  }
}
