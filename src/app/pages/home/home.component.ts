import { Component, OnInit } from '@angular/core';

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
    dots: false,
    // asNavFor: '.offer-slider-nav-inner',
    responsive: [{
      breakpoint: 768,
      settings: {
        arrows: false,
      }
    }]
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

  constructor() { }

  ngOnInit(): void {
  }

}
