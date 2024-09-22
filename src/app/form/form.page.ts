import { Component, AfterViewInit, Renderer2, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';  // Use AlertController instead of ModalController
import { TermsOfServiceModalComponent } from '../terms-of-service-modal/terms-of-service-modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements AfterViewInit {
  form: FormGroup;
  isMobile = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private alertController: AlertController,  // Updated to AlertController
    private renderer: Renderer2
  ) {
    // Initialize the form with validation rules
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^05\d{8}$/)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      jobType: ['', Validators.required],
      cv: [null, Validators.required],  // CV is required
      additionalFiles: [null],  // Additional files are optional
      terms: [false, Validators.requiredTrue]  // Terms must be accepted
    });
  }

  // Opens the Terms of Service modal
  async openTermsModal(event: Event) {
    event.preventDefault();
    // Logic for opening modal remains the same
  }

  // Handles file input changes with file type and size validation
  onFileChange(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const validFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024; // 5 MB limit for file uploads

      if (validFileTypes.includes(file.type) && file.size <= maxSize) {
        if (field === 'cv') {
          this.form.patchValue({ cv: file });
        } else if (field === 'additionalFiles') {
          this.form.patchValue({ additionalFiles: input.files });
        }
      } else {
        this.presentErrorAlert('Invalid file type or file size too large. Please upload a PDF or Word document under 5MB.');
      }
    }
  }

  // Displaying Ionic alert for errors and messages using AlertController
  async presentErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',  // Set header for the alert
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Submits the form data
  submitForm() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('firstName', this.form.get('firstName')?.value);
      formData.append('phoneNumber', this.form.get('phoneNumber')?.value);
      formData.append('email', this.form.get('email')?.value);
      formData.append('gender', this.form.get('gender')?.value);
      formData.append('jobType', this.form.get('jobType')?.value);
      formData.append('cv', this.form.get('cv')?.value);

      if (this.form.get('additionalFiles')?.value) {
        const files: File[] = this.form.get('additionalFiles')?.value;
        for (let i = 0; i < files.length; i++) {
          formData.append('additionalFiles', files[i]);
        }
      }

      this.http.post(`${environment.apiUrl}/submit`, formData).subscribe(
        (response) => {
          console.log('Form submitted successfully:', response);
          this.presentErrorAlert('تم تسجيلك بنجاح');
          this.form.reset();  // Reset the form after successful submission
        },
        (error) => {
          console.error('Error submitting form:', error);
          this.presentErrorAlert('يوجد خطأ في التقديم. حاول مرة أخرى.');
        }
      );
    } else {
      this.presentErrorAlert('يرجى ملء جميع الحقول المطلوبة.');
    }
  }

  ngAfterViewInit() {
    this.adjustFormLayout();
  }

  // Adjusts the form layout for better viewing
  adjustFormLayout() {
    const formContainer = document.querySelector('.form-container') as HTMLElement;
    if (formContainer) {
      formContainer.style.maxHeight = `calc(100vh - ${formContainer.offsetTop}px - 20px)`;
    }
  }

  // Handles window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = window.innerWidth < 768;
    this.adjustFormLayout();
  }

  ngOnInit() {
    this.isMobile = window.innerWidth < 768;
  }
}
