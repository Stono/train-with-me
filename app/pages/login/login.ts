import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';

declare var facebookConnectPlugin:any;

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData) { }

  facebookSignIn() {
      this.userData.loginWithFacebook();
  }
}
