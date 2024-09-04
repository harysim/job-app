import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  mode: string = 'md'; // Default mode to 'md' to ensure it's always defined

  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Set the mode based on the platform
      this.mode = this.platform.is('ios') ? 'ios' : 'md';
    });
  }
}
