import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OffboardingFormData } from './offboarding-form.model';

@Injectable({
  providedIn: 'root',
})
export class OffboardingFormService {
  constructor(private fb: FormBuilder) {}

  createForm(initialData?: Partial<OffboardingFormData>): FormGroup {
    return this.fb.group({
      receiver: [initialData?.receiver || '', Validators.required],
      email: [
        initialData?.email || '',
        [Validators.required, Validators.email],
      ],
      phone: [
        initialData?.phone || '',
        [Validators.required, Validators.pattern('^[0-9]{9,}$')],
      ],
      streetLine: [initialData?.streetLine || '', Validators.required],
      city: [initialData?.city || '', Validators.required],
      postalCode: [initialData?.postalCode || '', Validators.required],
      country: [initialData?.country || '', Validators.required],
      notes: [initialData?.notes || ''],
    });
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
