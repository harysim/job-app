import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  mode: string = 'md'; // Default mode to 'md'

  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Set the mode based on the platform
      this.mode = this.platform.is('ios') ? 'ios' : 'md';

      // Check and apply dark mode based on system preference
      this.checkDarkThemePreference();
    });
  }

  checkDarkThemePreference() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.toggleDarkTheme(prefersDark.matches);

    // Listen for changes to the system's dark mode preference
    prefersDark.addEventListener('change', (mediaQuery) => {
      this.toggleDarkTheme(mediaQuery.matches);
    });
  }

  toggleDarkTheme(shouldEnable: boolean) {
    document.body.setAttribute('data-theme', shouldEnable ? 'dark' : 'light');
  }
}
