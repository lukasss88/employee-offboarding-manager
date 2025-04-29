import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OffboardingFormComponent } from './offboarding-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { OffboardingFormService } from './offboarding-form.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('OffboardingFormComponent', () => {
  let component: OffboardingFormComponent;
  let fixture: ComponentFixture<OffboardingFormComponent>;
  let formService: OffboardingFormService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OffboardingFormComponent,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
      ],
      providers: [OffboardingFormService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(OffboardingFormComponent);
    component = fixture.componentInstance;
    formService = TestBed.inject(OffboardingFormService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', () => {
    it('should create a form on init', () => {
      expect(component.form).toBeDefined();
    });

    it('should initialize with provided data', () => {
      const initialData = {
        receiver: 'John Doe',
        email: 'john@example.com',
      };

      component.initialData = initialData;
      component.ngOnInit();
      fixture.detectChanges();

      expect(component.form.get('receiver')?.value).toBe(initialData.receiver);
      expect(component.form.get('email')?.value).toBe(initialData.email);
    });
  });

  describe('Form Validation', () => {
    it('should initialize with invalid form', () => {
      expect(component.form.valid).toBeFalsy();
    });

    it('should validate required fields', () => {
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
        const control = component.form.get(controlName);
        expect(control?.errors?.['required']).toBeTruthy();
      });
    });

    it('should validate email format', () => {
      const emailControl = component.form.get('email');

      emailControl?.setValue('invalid-email');
      expect(emailControl?.errors?.['email']).toBeTruthy();

      emailControl?.setValue('valid@email.com');
      expect(emailControl?.errors?.['email']).toBeFalsy();
    });

    it('should validate phone number format', () => {
      const phoneControl = component.form.get('phone');

      phoneControl?.setValue('123');
      expect(phoneControl?.errors?.['pattern']).toBeTruthy();

      phoneControl?.setValue('123456789');
      expect(phoneControl?.errors?.['pattern']).toBeFalsy();
    });

    it('should not require notes field', () => {
      const notesControl = component.form.get('notes');
      expect(notesControl?.errors).toBeFalsy();
    });
  });

  describe('Form Submission', () => {
    it('should not emit formSubmit when form is invalid', () => {
      spyOn(component.formSubmit, 'emit');

      component.onSubmit();
      expect(component.formSubmit.emit).not.toHaveBeenCalled();
    });

    it('should mark all fields as touched when submitting invalid form', () => {
      spyOn(formService, 'markFormGroupTouched');

      component.onSubmit();
      expect(formService.markFormGroupTouched).toHaveBeenCalledWith(
        component.form
      );
    });

    it('should emit formSubmit with form value when form is valid', () => {
      spyOn(component.formSubmit, 'emit');

      const validFormValue = {
        receiver: 'John Doe',
        email: 'john@example.com',
        phone: '123456789',
        streetLine: '123 Main St',
        city: 'New York',
        postalCode: '10001',
        country: 'USA',
        notes: 'Some notes',
      };

      component.form.patchValue(validFormValue);
      expect(component.form.valid).toBeTruthy();

      component.onSubmit();
      expect(component.formSubmit.emit).toHaveBeenCalledWith(validFormValue);
    });
  });

  describe('Error Display', () => {
    it('should show validation messages when form is submitted with errors', () => {
      component.onSubmit();
      fixture.detectChanges();

      const errorElements = fixture.debugElement.queryAll(By.css('mat-error'));
      expect(errorElements.length).toBeGreaterThan(0);
    });
  });

  describe('Cancel Button', () => {
    it('should emit formCancel when cancel button is clicked', () => {
      spyOn(component.formCancel, 'emit');

      const cancelButton = fixture.debugElement.query(
        By.css('button[type="button"]')
      );
      cancelButton.nativeElement.click();

      expect(component.formCancel.emit).toHaveBeenCalled();
    });
  });
});
