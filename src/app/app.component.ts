import { AppState } from './app.global';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Subject } from 'rxjs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomePage';
  activePage = new Subject();

  pages: Array<{ title: string, component: any, active: boolean, icon: string }>;
  rightMenuItems: Array<{ icon: string, active: boolean }>;
  state: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashscreen: SplashScreen, public global: AppState) {
    this.initializeApp();
    this.rightMenuItems = [
      { icon: 'home', active: true },
      { icon: 'alarm', active: false },
      { icon: 'analytics', active: false },
      { icon: 'archive', active: false },
      { icon: 'basket', active: false },
      { icon: 'body', active: false },
      { icon: 'bookmarks', active: false },
      { icon: 'camera', active: false },
      { icon: 'beer', active: false },
      { icon: 'power', active: false },
    ]

    this.pages = [
      { title: 'Home', component: 'HomePage', active: true, icon: 'home' },
      { title: 'Ionic Official Components', component: 'IonicOfficialComponentsPage', active: false, icon: 'ionic' },
      { title: 'Ionic Native Features', component: 'IonicNativePage', active: false, icon: 'ionic' },
      { title: 'Login', component: 'LoginListPage', active: false, icon: 'archive' },
      { title: 'Lists', component: 'ListPage', active: false, icon: 'body' },
      { title: 'Miscellaneous', component: 'MiscellaneousListPage', active: false, icon: 'bookmarks' },
      { title: 'Popup Fab', component: 'PopupFabPage', active: false, icon: 'map' },
      { title: 'Popup Modal', component: 'PopupModalsPage', active: false, icon: 'basket' },
      { title: 'Popup Menu', component: 'PopupMenuListPage', active: false, icon: 'beer' },
      { title: 'Profile', component: 'ProfileListPage', active: false, icon: 'camera' },
      { title: 'Side Menu', component: 'SideMenuPage', active: false, icon: 'bookmark' },
      // Removed for now as there were breaking changes in slides
      { title: 'Slides', component: 'SlidesPage', active: false, icon: 'contact' },
      { title: 'Theming', component: 'ThemingPage', active: false, icon: 'power' },
    ];

    this.activePage.subscribe((selectedPage: any) => {
      this.pages.map(page => {
        page.active = page.title === selectedPage.title;
      });
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.global.set('theme', '');
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage.next(page);
  }

  rightMenuClick(item) {
    this.rightMenuItems.map(menuItem => menuItem.active = false);
    item.active = true;
  }
}
