import { Injectable } from '@angular/core';

export interface SiteInfo{
  location_short: string;
  location_full: string;
  contact: string;
  email: string;
  fb_link: string;
  line_link: string;
  insta_link: string;
}

@Injectable({
  providedIn: 'root'
})
export class SiteInfoService {

  // tslint:disable-next-line: variable-name
  _siteInfo =  {
    location_short: '3-44 Kakusa, Kadogawa',
    location_full: 'Higashiusuki District, Miyazaki 889-0603, Japan',
    contact: '+81 982-66-5018',
    email: 'masalamaster.jp@gmail.com',
    fb_link: 'https://www.facebook.com/masalamaster.kadogawa',
    line_link: '',
    insta_link: 'https://www.instagram.com/masala_master/'
  } as SiteInfo;


  constructor() { }


  get siteInfo(): SiteInfo{
    return this._siteInfo;
  }





}
