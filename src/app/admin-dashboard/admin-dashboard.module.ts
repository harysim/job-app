import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminLoginService } from '../admin-login/admin-login.service'; // Correct import for the service

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminDashboardComponent],
  providers: [AdminLoginService] // Ensure the service is provided
})
export class AdminDashboardPageModule {}
