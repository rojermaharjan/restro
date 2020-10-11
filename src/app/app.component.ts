import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'restro';
  isSideareaOpen = false;
  isMobileNavOpen = false;
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
  sliderNavConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    prevArrow: '.offer-slider-nav .slider-prev',
    nextArrow: '.offer-slider-nav .slider-next',
    asNavFor: '.offer-slider',
    focusOnSelect: true,
    responsive: [{
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        autoplay: true
      }
    }]
  };

  toggleSidearea(isOverlay: boolean = false): void {
    if (isOverlay) {
      if (this.isSideareaOpen === true) {
        this.isSideareaOpen = false;
      }
    } else {
      this.isSideareaOpen = !this.isSideareaOpen;
    }
  }
}
