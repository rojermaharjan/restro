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

  @Output() toggleSidearea = new EventEmitter();

  constructor(private dialog: MatDialog, public siteInfoSvc: SiteInfoService) { }

  ngOnInit(): void {
  }

  openLoginDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;

    this.dialog.open(LoginDialogComponent, dialogConfig);
  }
}
