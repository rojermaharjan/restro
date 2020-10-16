import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabContentComponent } from './tab-content/tab-content.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  declarations: [TabContentComponent, TabsComponent],
  imports: [
    CommonModule
  ],
  exports: [TabContentComponent, TabsComponent]
})
export class TabsModule { }
