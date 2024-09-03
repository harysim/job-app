import { Component, OnInit } from '@angular/core';
import { AdminLoginService } from '../admin-login/admin-login.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  applications: any[] = [];
  mode: string;
  apiUrl: string = 'http://localhost:5000/api';

  constructor(
    private adminLoginService: AdminLoginService,
    private platform: Platform,
    private router: Router
  ) {
    // Set the mode based on the platform
    this.mode = this.platform.is('ios') ? 'ios' : 'md';
  }

  ngOnInit(): void {
    this.loadApplications(); // Load applications on component initialization
  }

  loadApplications(): void {
    this.adminLoginService.getApplications().subscribe(
      (data) => {
        this.applications = data;
      },
      (error) => {
        console.error('Error loading applications', error);
      }
    );
  }

  translateJobType(jobType: string): string {
    switch (jobType) {
      case 'fullTime':
        return 'دوام كامل';
      case 'partTime':
        return 'دوام جزئي';
      case 'remote':
        return 'عن بعد';
      default:
        return jobType;
    }
  }

  translateGender(gender: string): string {
    switch (gender) {
      case 'male':
        return 'ذكر';
      case 'female':
        return 'أنثى';
      default:
        return gender;
    }
  }

  edit(application: any): void {
    console.log('Editing:', application);
    this.router.navigate(['/edit-application', application.id]); // Navigate to the correct edit page with the application ID
  }

  confirmDelete(application: any): void {
    if (confirm('هل أنت متأكد من الحذف؟')) {
      this.delete(application);
    }
  }

  delete(application: any): void {
    console.log('Deleting:', application);
    this.adminLoginService.deleteApplication(application.id).subscribe(
      (response) => {
        console.log('Application deleted:', response);
        this.loadApplications(); // Refresh the list after deletion
      },
      (error) => {
        console.error('Error deleting application', error);
      }
    );
  }

  logout(): void {
    console.log('Logout function triggered');
    this.adminLoginService.logout().subscribe(
      (response) => {
        console.log('Logout successful', response);
        window.location.href = '/admin-login'; // Redirect to the login page
      },
      (error) => {
        console.error('Logout error', error);
      }
    );
  }
}
