import { TestBed } from '@angular/core/testing';
import { OffboardingFormService } from './offboarding-form.service';
import { FormBuilder, FormGroup } from '@angular/forms';

describe('OffboardingFormService', () => {
  let service: OffboardingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OffboardingFormService, FormBuilder],
    });
    service = TestBed.inject(OffboardingFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createForm', () => {
    let form: FormGroup;

    beforeEach(() => {
      form = service.createForm();
    });

    it('should create a form with all required fields', () => {
      expect(form.get('receiver')).toBeTruthy();
      expect(form.get('email')).toBeTruthy();
      expect(form.get('phone')).toBeTruthy();
      expect(form.get('streetLine')).toBeTruthy();
      expect(form.get('city')).toBeTruthy();
      expect(form.get('postalCode')).toBeTruthy();
      expect(form.get('country')).toBeTruthy();
      expect(form.get('notes')).toBeTruthy();
    });

    it('should validate required fields', () => {
      const requiredFields = [
        'receiver',
        'email',
        'phone',
        'streetLine',
        'city',
        'postalCode',
        'country',
      ];

      requiredFields.forEach((field) => {
        const control = form.get(field);
        expect(control?.errors?.['required']).toBeTruthy();
      });

      expect(form.get('notes')?.errors?.['required']).toBeFalsy();
    });

    it('should validate email format', () => {
      const emailControl = form.get('email');

      emailControl?.setValue('invalid-email');
      expect(emailControl?.errors?.['email']).toBeTruthy();

      emailControl?.setValue('valid@email.com');
      expect(emailControl?.errors?.['email']).toBeFalsy();
    });

    it('should validate phone number format', () => {
      const phoneControl = form.get('phone');

      phoneControl?.setValue('12345');
      expect(phoneControl?.errors?.['pattern']).toBeTruthy();

      phoneControl?.setValue('123456789');
      expect(phoneControl?.errors?.['pattern']).toBeFalsy();
    });
  });

  describe('markFormGroupTouched', () => {
    it('should mark all form controls as touched', () => {
      const form = service.createForm();

      Object.keys(form.controls).forEach((key) => {
        expect(form.get(key)?.touched).toBeFalsy();
      });

      service.markFormGroupTouched(form);

      Object.keys(form.controls).forEach((key) => {
        expect(form.get(key)?.touched).toBeTruthy();
      });
    });
  });
});
