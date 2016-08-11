import { Injectable } from '@angular/core';
import { Facebook } from 'ionic-native';

import { Events, LocalStorage, Storage, Platform } from 'ionic-angular';

@Injectable()
export class UserData {
  _favorites = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  storage = new Storage(LocalStorage);

  constructor(
    public events: Events,
    public platform: Platform
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
    if (!this.platform.is('cordova')) {
        return this.login('Karl Stoney');
    }
    // TODO: Only allow this login when on mobile (as it's native)
    console.log('logging in with facebook');
    Facebook.login(['email', 'public_profile', 'user_friends']).then(() => {
      // TODO: Validate status not logged in.
      Facebook.api('/me', ['id', 'email', 'name']).then(result => {
        this.login(result.name);
      });
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
