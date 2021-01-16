import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sliderConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    dots: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ]
  };
  slides = [
    {
      id: 1,
      src: '/assets/img/1.png',
      title: 'Some title',
      alt: 'Some title'
    },
    {
      id: 2,
      src: '/assets/img/2.png',
      title: 'Some title',
      alt: 'Some title'
    },
    {
      id: 3,
      src: '/assets/img/3.png',
      title: 'Some title',
      alt: 'Some title'
    }
  ];
  featuredCategories = [
    {
      id: 1,
      src: '/assets/img/feature1.jpg',
      icon: '/assets/img/feature1.png',
      title: 'Some category',
      alt: 'Some category'
    },
    {
      id: 2,
      src: '/assets/img/feature1.jpg',
      icon: '/assets/img/feature1.png',
      title: 'Some other category',
      alt: 'Some other category'
    },
    {
      id: 3,
      src: '/assets/img/feature1.jpg',
      icon: '/assets/img/feature1.png',
      title: 'More category',
      alt: 'More category'
    },
  ];
  menus = [
    {
      id: 1,
      title: 'Menu 1',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      items: [
        {
          id: 1,
          src: '/assets/img/h1-post-1.jpg',
          price: '120',
          title: 'Garlic Pasta',
          excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
        },
        {
          id: 2,
          src: '/assets/img/h1-post-1.jpg',
          price: '120',
          title: 'Garlic Pasta',
          excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
        },
        {
          id: 3,
          src: '/assets/img/h1-post-1.jpg',
          price: '120',
          title: 'Garlic Pasta',
          excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
        }
      ],
    },
    {
      id: 1,
      title: 'Menu 2',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      items: [
        {
          id: 1,
          src: '/assets/img/h1-post-1.jpg',
          price: '120',
          title: 'Garlic Pasta',
          excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
        },
        {
          id: 2,
          src: '/assets/img/h1-post-1.jpg',
          price: '120',
          title: 'Garlic Pasta',
          excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
        },
        {
          id: 3,
          src: '/assets/img/h1-post-1.jpg',
          price: '120',
          title: 'Garlic Pasta',
          excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
        }
      ],
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
