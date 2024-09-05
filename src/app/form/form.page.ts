import { Component, AfterViewInit, Renderer2, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
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
    private modalController: ModalController,
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
    const modal = await this.modalController.create({
      component: TermsOfServiceModalComponent
    });
    return await modal.present();
  }

  // Handles file input changes
  onFileChange(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      if (field === 'cv') {
        this.form.patchValue({ cv: input.files[0] });
      } else if (field === 'additionalFiles') {
        this.form.patchValue({ additionalFiles: input.files });
      }
    }
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
          alert('تم تسجيلك بنجاح');
          this.form.reset();  // Reset the form after successful submission
        },
        (error) => {
          console.error('Error submitting form:', error);
          alert('يوجد خطأ');
        }
      );
    } else {
      alert('يرجى ملء جميع الحقول المطلوبة.');
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
