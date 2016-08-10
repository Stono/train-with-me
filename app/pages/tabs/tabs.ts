import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { BlankPage } from '../blank/blank';
import { MapPage } from '../map/map';
import { SchedulePage } from '../schedule/schedule';
import { SpeakerListPage } from '../speaker-list/speaker-list';


@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = BlankPage; // SchedulePage
  tab2Root: any = BlankPage; // SpeakerListPage
  tab3Root: any = BlankPage; // MapPage
  tab4Root: any = BlankPage; // AboutPage
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
