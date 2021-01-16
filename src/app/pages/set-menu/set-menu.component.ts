import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-set-menu',
  templateUrl: './set-menu.component.html',
  styleUrls: ['./set-menu.component.scss']
})
export class SetMenuComponent implements OnInit {
  setMenuItems = [
    {
      id: 1,
      title: 'Main Course',
      items: [
        {
          description: 'Lorem Ipsum',
          price: '$10',
          name: 'Item 1',
          product_category: 'Lorem',
          image: '/assets/img/shop-img-1.jpg',
        },
        {
          description: 'Lorem Ipsum',
          price: '$10',
          name: 'Item 1',
          product_category: 'Lorem',
          image: '/assets/img/shop-img-1.jpg',
        },
        {
          description: 'Lorem Ipsum',
          price: '$10',
          name: 'Item 1',
          product_category: 'Lorem',
          image: '/assets/img/shop-img-1.jpg',
        },
        {
          description: 'Lorem Ipsum',
          price: '$10',
          name: 'Item 1',
          product_category: 'Lorem',
          image: '/assets/img/shop-img-1.jpg',
        },
        {
          description: 'Lorem Ipsum',
          price: '$10',
          name: 'Item 1',
          product_category: 'Lorem',
          image: '/assets/img/shop-img-1.jpg',
        }
      ]
    },
    {
      id: 2,
      title: 'Drinks',
      items: [
        {
          description: 'Lorem Ipsum Drinks',
          price: '$10',
          name: 'Item 1',
          product_category: 'Lorem',
          image: '/assets/img/shop-img-1.jpg',
        },
        {
          description: 'Lorem Ipsum Drinks',
          price: '$10',
          name: 'Item 1',
          product_category: 'Lorem',
          image: '/assets/img/shop-img-1.jpg',
        },
        {
          description: 'Lorem Ipsum Drinks',
          price: '$10',
          name: 'Item 1',
          product_category: 'Lorem',
          image: '/assets/img/shop-img-1.jpg',
        },
        {
          description: 'Lorem Ipsum Drinks',
          price: '$10',
          name: 'Item 1',
          product_category: 'Lorem',
          image: '/assets/img/shop-img-1.jpg',
        },
        {
          description: 'Lorem Ipsum Drinks',
          price: '$10',
          name: 'Item 1',
          product_category: 'Lorem',
          image: '/assets/img/shop-img-1.jpg',
        }
      ]
    },
    {
      id: 3,
      title: 'Desert',
      items: [
        {
          description: 'Lorem Ipsum Desert',
          price: '$10',
          name: 'Item 1',
          product_category: 'Lorem',
          image: '/assets/img/shop-img-1.jpg',
        },
        {
          description: 'Lorem Ipsum Desert',
          price: '$10',
          name: 'Item 1',
          product_category: 'Lorem',
          image: '/assets/img/shop-img-1.jpg',
        },
        {
          description: 'Lorem Ipsum Desert',
          price: '$10',
          name: 'Item 1',
          product_category: 'Lorem',
          image: '/assets/img/shop-img-1.jpg',
        },
        {
          description: 'Lorem Ipsum Desert',
          price: '$10',
          name: 'Item 1',
          product_category: 'Lorem',
          image: '/assets/img/shop-img-1.jpg',
        },
        {
          description: 'Lorem Ipsum Desert',
          price: '$10',
          name: 'Item 1',
          product_category: 'Lorem',
          image: '/assets/img/shop-img-1.jpg',
        }
      ]
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
