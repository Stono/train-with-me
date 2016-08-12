import {
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS, TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
}                               from '@angular/platform-browser-dynamic/testing';
import { setBaseTestProviders } from '@angular/core/testing';
import { TrainWithMe } from '../app/app.ts';

// this needs doing _once_ for the entire test suite, hence it's here
setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

// Mock out Ionic's platform class
class MockPlatform {
  public ready(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}
class MockUserData {
  public hasLoggedIn(): any {
    return new Promise((resolve: Function) => {
      resolve(false);
    });
  }
}
class MockMenu {
  public enable(): any {
    return true;
  }
}
class MockEvents {
  public subscribe(): any {
    return new Promise(resolve => {
      resolve();
    });
  }
}

let myApp = null;

describe('App', () => {
  beforeEach(function() {
    let events = (<any>new MockEvents());
    let userdata = (<any>new MockUserData());
    let menu = (<any>new MockMenu());
    let platform = (<any>new MockPlatform());

    myApp = new TrainWithMe(events, userdata, menu, platform);
  });

  it('initialises the app', () => {
    expect(myApp).not.toBeNull();
  });
});
