import { Injectable } from '@angular/core';
import { Facebook } from 'ionic-native';
import { MockFacebook } from './mock-facebook';
import { ToastController, Events, LocalStorage, Storage, Platform } from 'ionic-angular';

@Injectable()
export class UserData {
  _favorites = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  storage = new Storage(LocalStorage);
  facebook = this.platform.is('cordova') ? Facebook : new MockFacebook();

  constructor(
    public events: Events,
    public platform: Platform,
    public toast: ToastController
  ) {}

  hasFavorite(sessionName) {
    return (this._favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName) {
    this._favorites.push(sessionName);
  }

  removeFavorite(sessionName) {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  }

  login(username) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:login');
  }

  loginWithFacebook() {
    console.log('logging in with facebook');
    this.facebook.login(['email', 'public_profile', 'user_friends']).then(loginResult => {
      if (loginResult.status === 'connected') {
        this.facebook.api('/me', ['id', 'email', 'name']).then(result => {
          this.login(result.name);
        });
      } else if (loginResult.status === 'not_authorized') {
        this.toast.create({
          message: 'Facebook authorizations rejected.',
          showCloseButton: true,
          duration: 3000
        }).present();
      } else {
        this.toast.create({
          message: 'Facebook login Failed.',
          showCloseButton: true,
          duration: 3000
        }).present();
      }
    });
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.events.publish('user:logout');
  }

  setUsername(username) {
    this.storage.set('username', username);
  }

  getUsername() {
    return this.storage.get('username').then(value => {
      return value;
    });
  }

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then(value => {
      return value;
    });
  }
}
