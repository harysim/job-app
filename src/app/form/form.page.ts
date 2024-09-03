import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { TermsOfServiceModalComponent } from '../terms-of-service-modal/terms-of-service-modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage {
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private modalController: ModalController) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^05\d{8}$/)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      jobType: ['', Validators.required],
      cv: [null, Validators.required],  // CV is required
      additionalFiles: [null],  // Additional files are optional
      terms: [false, Validators.requiredTrue]
    });
  }

  async openTermsModal(event: Event) {
    event.preventDefault();  // Prevents the link from navigating
    const modal = await this.modalController.create({
      component: TermsOfServiceModalComponent
    });
    return await modal.present();
  }

  onFileChange(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      if (field === 'cv') {
        this.form.patchValue({
          cv: input.files[0]
        });
      } else if (field === 'additionalFiles') {
        this.form.patchValue({
          additionalFiles: input.files
        });
      }
    }
  }

  submitForm() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('firstName', this.form.get('firstName')?.value);
      formData.append('phoneNumber', this.form.get('phoneNumber')?.value);
      formData.append('email', this.form.get('email')?.value);
      formData.append('gender', this.form.get('gender')?.value);
      formData.append('jobType', this.form.get('jobType')?.value);
      formData.append('cv', this.form.get('cv')?.value);  // Append CV file

      if (this.form.get('additionalFiles')?.value) {
        const files: File[] = this.form.get('additionalFiles')?.value;
        for (let i = 0; i < files.length; i++) {
          formData.append('additionalFiles', files[i]);
        }
      }

      this.http.post('http://localhost:5000/api/submit', formData).subscribe(
        (response) => {
          console.log('Form submitted successfully:', response);
          alert('Application submitted successfully!');
          this.form.reset();  // Reset the form after successful submission
        },
        (error) => {
          console.error('Error submitting form:', error);
          alert('There was an error submitting the form.');
        }
      );
    }
  }
}
