import { Component } from '@angular/core';

import { MenuController, NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';


interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  templateUrl: 'build/pages/tutorial/tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;

  constructor(public navCtrl: NavController, public menu: MenuController) {
    this.slides = [
      {
        title: 'Welcome to <b>TWM</b>',
        description: '<b>Train With Me</b> is a central place for you to connect with your fellow athletes.',
        image: 'img/sports/basketball.png',
      },
      {
        title: 'Track Statistics',
        description: 'You can track your statistics, personal bests, weight, height and so on.',
        image: 'img/sports/running.png',
      },
      {
        title: 'Complete with Friends',
        description: 'See how your friends are doing on similar activities, set challenges, compete as a team.',
        image: 'img/sports/tennis.png',
      }
    ];
  }

  startApp() {
    this.navCtrl.push(TabsPage);
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
