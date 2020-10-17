import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appToggleClass]'
})
export class ToggleClassDirective {
  el: any;
  @Input() className = 'active';

  @HostListener('click', ['$event'])
  onClick(): void {
    this.el.classList.toggle(this.className);
  }

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

}
