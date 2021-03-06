import { provide, Component, ViewChild, ExceptionHandler } from '@angular/core';

import { Events, ionicBootstrap, MenuController, Nav, Platform } from 'ionic-angular';
import { Splashscreen, StatusBar } from 'ionic-native';

import { AccountPage } from './pages/account/account';
import { LoginPage } from './pages/login/login';
import { TabsPage } from './pages/tabs/tabs';
import { BlankPage } from './pages/blank/blank';
import { TutorialPage } from './pages/tutorial/tutorial';

import { UserData } from './providers/user-data';
import { CustomExceptionHandler } from './providers/exception-handler';
import { ActivityFeed } from './providers/activity-feed';

interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
  templateUrl: 'build/app.html'
})
export class TrainWithMe {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageObj[] = [
    { title: 'Activity', component: TabsPage, icon: 'list' },
    { title: 'Friends', component: TabsPage, index: 1, icon: 'people' },
    { title: 'Log', component: TabsPage, index: 2, icon: 'book' },
    { title: 'About', component: TabsPage, index: 3, icon: 'information-circle' },
  ];
  loggedInPages: PageObj[] = [
    { title: 'Account', component: AccountPage, icon: 'person' }, // AccountPage
    { title: 'Friends', component: BlankPage, icon: 'people' }, // SpeakerListPage
    { title: 'Logout', component: TabsPage, icon: 'log-out' } // TabsPage
  ];
  loggedOutPages: PageObj[] = [
    { title: 'Login', component: LoginPage, icon: 'log-in' }
  ];
  rootPage: any = TutorialPage;

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    platform: Platform
  ) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === 'true');
    });

    this.listenToLoginEvents();
  }

  openPage(page: PageObj) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});

    } else {
      this.nav.setRoot(page.component);
    }

    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
      this.nav.setRoot(AccountPage);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
      this.nav.setRoot(LoginPage);
    });
  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }
}

// Pass the main App component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument, see the docs for
// more ways to configure your app:
// http://ionicframework.com/docs/v2/api/config/Config/
// Place the tabs on the bottom for all platforms
// See the theming docs for the default values:
// http://ionicframework.com/docs/v2/theming/platform-specific-styles/

ionicBootstrap(TrainWithMe, [
  provide(ExceptionHandler, { useClass: CustomExceptionHandler }),
  UserData, ActivityFeed
], {});
