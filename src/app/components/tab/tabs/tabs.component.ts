import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';

import { TabContentComponent } from '../tab-content/tab-content.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterContentInit {

  @ContentChildren(TabContentComponent) tabs: QueryList<TabContentComponent>;

  // contentChildren are set
  ngAfterContentInit(): void {
    // get all active tabs
    const activeTabs = this.tabs.filter((tabContent) => tabContent.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tabContent: TabContentComponent): void {
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);

    // activate the tab the user has clicked on.
    tabContent.active = true;
  }

}
