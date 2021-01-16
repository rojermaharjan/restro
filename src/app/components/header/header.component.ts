import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SiteInfoService } from 'src/app/services/site-info.service';
import { environment } from 'src/environments/environment';

import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isSideareaOpen = false;
  isMobileNavOpen = false;
  menuItems = [
    {
      path: '/',
      title: 'Home',
      left: true,
    },
    {
      path: '/product-list',
      title: 'Products',
      left: true,
    },
    {
      path: '/contact',
      title: 'Contact',
      left: false,
    },
    {
      path: '/product/1',
      title: 'Menu',
      left: false,
    },
  ];
  leftItems = this.menuItems.filter(item => item.left);
  rightItems = this.menuItems.filter(item => !item.left);

  @Output() toggleSidearea = new EventEmitter();

  constructor(private dialog: MatDialog, public siteInfoSvc: SiteInfoService) { }

  ngOnInit(): void {
    console.log();
  }

  openLoginDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;

    this.dialog.open(LoginDialogComponent, dialogConfig);
  }
}
