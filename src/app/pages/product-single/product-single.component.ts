import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { ProductService } from 'src/app/product/product.service';
import { StoreService } from 'src/app/services/store.service';
import { itemImageUrl } from 'src/app/utils';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.scss']
})
export class ProductSingleComponent implements OnInit {
  productQty = 1;
  product$ = this.store.watch('product').pipe(pluck('item'));
  product: any;

  constructor(
    private productSvc: ProductService,
    private store: StoreService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      await this.productSvc.getItem('product', id);
    });
    this.product$.subscribe(p => this.product = p);
  }

  updateQty(isPlus: boolean): void {
    if (isPlus) {
      this.productQty += 1;
    } else {
      if (this.productQty !== 1) {
        this.productQty -= 1;
      }
    }
  }

  get imageUrl() {
    return itemImageUrl(this.product);
  }
}

