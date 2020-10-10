import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHeaderFixed]'
})
export class HeaderFixedDirective {
  el: any;
  headerHeight: number;
  @Input() className = 'fixed';

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const pos = window.scrollY;
    this.headerHeight = this.el.offsetHeight;
    console.log(pos, this.headerHeight);
    if (pos >= this.headerHeight - 25) {
      this.el.classList.add(this.className);
    }
    else {
      this.el.classList.remove(this.className);
    }
  }

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }
}
