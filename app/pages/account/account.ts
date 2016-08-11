import { Component } from '@angular/core';

import { AlertController, NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { BlankPage } from '../blank/blank';
import { UserData } from '../../providers/user-data';


@Component({
  templateUrl: 'build/pages/account/account.html',
})
export class AccountPage {
  username: string;
  picture: string;

  constructor(public alertCtrl: AlertController, public nav: NavController, public userData: UserData) {

  }

  ngAfterViewInit() {
    this.getUsername();
    this.getPicture();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  changeUsername() {
    let alert = this.alertCtrl.create({
      title: 'Change Username',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: 'username'
    });
    alert.addButton({
      text: 'Ok',
      handler: data => {
        this.userData.setUsername(data.username);
        this.getUsername();
      }
    });

    alert.present();
  }

  getUsername() {
    this.userData.getUsername().then(username => {
      this.username = username;
    });
  }

  getPicture() {
    this.userData.getPicture().then(picture => {
      this.picture = picture;
    });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.userData.logout();
    this.nav.setRoot(LoginPage);
  }

  profile() {
    this.nav.setRoot(BlankPage);
  }
}
