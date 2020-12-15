import { Component, Input, OnInit } from '@angular/core';
import { utils } from 'protractor';
import { IProduct } from 'src/app/product/product';
import { itemImageUrl } from 'src/app/utils';

@Component({
  selector: 'app-item-card-one',
  templateUrl: './item-card-one.component.html',
  styleUrls: ['./item-card-one.component.scss']
})
export class ItemCardOneComponent implements OnInit {
  @Input() item: IProduct;
  @Input() image: string;

  constructor() { }

  ngOnInit(): void {
  }
}
