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
