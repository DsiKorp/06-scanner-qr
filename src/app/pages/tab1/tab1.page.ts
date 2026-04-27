import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  constructor() { }

  ionViewDidEnter() {
    console.log('ionViewDidEnter event fired');
  };

  ionViewDidLeave() {
    console.log('ionViewDidLeave event fired');
  };

  ionViewWillEnter() {
    console.log('ionViewWillEnter event fired');
  };

  ionViewWillLeave() {
    console.log('ionViewWillLeave event fired');
  };

}
