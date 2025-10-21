import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ContactRequest, ContactUsService } from '../../contact-us.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
})
export class ContactPageComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;

  constructor(
    private fb: FormBuilder,
    private contactUsService: ContactUsService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitMessage = '';

      const contactData: ContactRequest = this.contactForm.value;

      this.contactUsService.sendContactMessage(contactData).subscribe({
        next: (response) => {
          this.submitSuccess = true;
          this.submitMessage = response.message || 'Message sent successfully!';
          this.contactForm.reset();
          this.isSubmitting = false;
        },
        error: (error) => {
          this.submitSuccess = false;
          this.submitMessage =
            error.error?.message || 'Failed to send message. Please try again.';
          this.isSubmitting = false;
        },
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.contactForm.controls).forEach((key) => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${
        fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
      } is required`;
    }
    if (field?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (field?.hasError('minlength')) {
      const requiredLength = field.errors?.['minlength']?.requiredLength;
      return `${
        fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
      } must be at least ${requiredLength} characters`;
    }
    return '';
  }
}
