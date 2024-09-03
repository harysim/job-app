import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminLoginService } from './admin-login.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';

  constructor(private adminLoginService: AdminLoginService, private router: Router) {}

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
