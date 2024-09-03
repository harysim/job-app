import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Import Router for navigation
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminLoginService } from '../admin-login/admin-login.service';

@Component({
  selector: 'app-edit-application',
  templateUrl: './edit-application.page.html',
  styleUrls: ['./edit-application.page.scss'],
})
export class EditApplicationPage implements OnInit {
  applicationId: string = '';
  editForm!: FormGroup;  // Add definite assignment assertion (!)

  constructor(
    private route: ActivatedRoute,
    private router: Router,  // Inject Router for navigation
    private fb: FormBuilder,
    private adminLoginService: AdminLoginService
  ) {}

  ngOnInit() {
    this.editForm = this.fb.group({
      full_name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      job_type: ['', Validators.required],
    });

    this.applicationId = this.route.snapshot.paramMap.get('id') || '';

    this.adminLoginService.getApplicationById(this.applicationId).subscribe(
      (data) => {
        this.editForm.patchValue({
          full_name: data.full_name,
          phone: data.phone,
          email: data.email,
          gender: data.gender,
          job_type: data.job_type,
        });
      },
      (error) => {
        console.error('Error loading application', error);
      }
    );
  }

  saveChanges() {
    if (this.editForm.valid) {
      this.adminLoginService.updateApplication(this.applicationId, this.editForm.value).subscribe(
        (response) => {
          console.log('Application updated successfully:', response);
          this.router.navigate(['/admin-dashboard']);  // Navigate back to dashboard after saving
        },
        (error) => {
          console.error('Error updating application', error);
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }
}
