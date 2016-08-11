import { Injectable } from '@angular/core';

@Injectable()
export class MockFacebook {
  constructor() {}
  login() {
    let mockData = {
      status: 'connected',
      authResponse: {
        session_key: true,
        accessToken: 'kgkh3g42kh4g23kh4g2kh34g2kg4k2h4gkh3g4k2h4gk23h4gk2h34gk234gk2h34AndSoOn',
        expiresIn: 5183979,
        sig: 'meh',
        secret: 'meh',
        userID: '514674601'
      }
    };
    return new Promise(resolve => { resolve(mockData); });
  };

  api() {
    let mockData = {
      'id': '514674601',
      'email': 'karlstoney@googlemail.com',
      'name': 'Karl Stoney'
    };
    return new Promise(resolve => { resolve(mockData); });
  }
};
