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
    it('should create a form with all required fields', () => {
      const form = service.createForm();
      expect(form).toBeTruthy();

      const requiredControls = [
        'receiver',
        'email',
        'phone',
        'streetLine',
        'city',
        'postalCode',
        'country',
      ];

      requiredControls.forEach((controlName) => {
        expect(form.contains(controlName)).toBeTrue();
        const control = form.get(controlName);
        expect(control?.validator).toBeTruthy();
      });

      expect(form.contains('notes')).toBeTrue();
      const notesControl = form.get('notes');
      expect(notesControl?.validator).toBeNull();
    });

    it('should initialize with provided values', () => {
      const initialData = {
        receiver: 'John Doe',
        email: 'john@example.com',
        phone: '123456789',
        streetLine: '123 Main St',
        city: 'New York',
        postalCode: '10001',
        country: 'USA',
        notes: 'Some notes',
      };

      const form = service.createForm(initialData);

      Object.entries(initialData).forEach(([key, value]) => {
        expect(form.get(key)?.value).toBe(value);
      });
    });
  });

  describe('markFormGroupTouched', () => {
    it('should mark all controls as touched', () => {
      const form = service.createForm();

      Object.keys(form.controls).forEach((key) => {
        expect(form.get(key)?.touched).toBeFalse();
      });

      service.markFormGroupTouched(form);

      Object.keys(form.controls).forEach((key) => {
        expect(form.get(key)?.touched).toBeTrue();
      });
    });

    it('should handle nested form groups', () => {
      const fb = TestBed.inject(FormBuilder);
      const nestedForm = fb.group({
        parent: fb.group({
          child: [''],
        }),
      });

      service.markFormGroupTouched(nestedForm);

      const childControl = nestedForm.get('parent.child');
      expect(childControl?.touched).toBeTrue();
    });
  });
});
