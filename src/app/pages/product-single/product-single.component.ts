import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.scss']
})
export class ProductSingleComponent implements OnInit {
  productQty = 1;

  constructor() { }

  ngOnInit(): void {
  }

  updateQty(isPlus: boolean): void {
    if (isPlus) {
      this.productQty += 1;
    } else
      if (this.productQty !== 1) {
        this.productQty -= 1;
      }
  }
}

