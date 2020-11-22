import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { SiteInfoService } from './services/site-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'restro';
  isSideareaOpen = false;
  isMobileNavOpen = false;

  constructor(
    private router: Router,
    public siteInfoSvc:SiteInfoService
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

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
