import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  orderSelectItems = [
    { key: 'Sort by popularity', value: 'popularity' },
    { key: 'Sort by average rating', value: 'rating' },
    { key: 'Sort by newness', value: 'date' },
    { key: 'Sort by price: low to high', value: 'price' },
    { key: 'Sort by price: high to low', value: 'price-desc' }
  ];
  styleGuide = {
    caretClass: 'caret',
    selectClass: 'select-1',
    selectedOptionClass: 'selected-option',
    selectMenuClass: 'dropdown',
    optionsClass: 'option'
  };
  value = 40;
  highValue = 80;
  priceRange: Options = {
    floor: 20,
    ceil: 100,
    animate: false,
    hideLimitLabels: true,
    hidePointerLabels: true
  };

  constructor() { }

  ngOnInit(): void {
  }

}
