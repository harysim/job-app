import { Component, Renderer2, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminLoginService } from './admin-login.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements AfterViewInit {
  username: string = '';
  password: string = '';

  constructor(
    private adminLoginService: AdminLoginService,
    private router: Router,
    private renderer: Renderer2,
    private platform: Platform
  ) {}

  ngAfterViewInit() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.handleKeyboardEvents();
    }
  }

  handleKeyboardEvents() {
    // Listen for the keyboard to open
    window.addEventListener('keyboardDidShow', (event: any) => {
      // Adjust the viewport to ensure the focused element is visible
      const inputField = document.activeElement as HTMLElement;
      if (inputField && inputField.tagName === 'INPUT') {
        setTimeout(() => {
          inputField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200); // Add a slight delay to ensure the keyboard is fully opened
      }
    });

    // Listen for the keyboard to hide
    window.addEventListener('keyboardDidHide', () => {
      // Optionally reset any viewport changes or scroll back to the top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  submitForm() {
    this.adminLoginService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login successful', response);
        this.router.navigate(['/admin-dashboard']);
      },
      error => {
        console.error('Login error', error);
        alert('Login failed. Please check your credentials.');
      }
    );
  }
}
