import { Injectable } from '@angular/core';

@Injectable()
export class MockFacebook {
  constructor() {}
  login() {
    let mockData = {
      status: 'connected',
      authResponse: {
        session_key: true,
        accessToken: 'doesnt-matter',
        expiresIn: 5183979,
        sig: 'meh',
        secret: 'meh',
        userID: '514674601'
      }
    };
    return new Promise(resolve => { resolve(mockData); });
  };

  api(url) {
    let mockData;
    switch (url) {
      case '/me?fields=id,email,name':
        mockData = {
          'id': '514674601',
          'email': 'karlstoney@googlemail.com',
          'name': 'Karl Stoney (Test)'
        };
        break;
      case '/514674601/picture?type=large&redirect=false':
        mockData = {
          'data': {
            'is_silhouette': false,
            'url': 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/v/t1.0-1/p200x200/13697140_10154408571819602_7118177093248447238_n.jpg?oh=58ca43dea47a87b453add417004fdd73&oe=581524CB&__gda__=1482280016_b6df6699621d6cb4e5cbbdbe2b54a98a'
          }
        };
        break;
      default:
        throw new Error('No mock api configured for: ' + url);
    }

    return new Promise(resolve => { resolve(mockData); });
  }
};
