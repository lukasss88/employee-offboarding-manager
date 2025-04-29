import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OffboardingModalComponent } from './offboarding-modal.component';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { OffboardingFormService } from '../../services/offboarding-form.service';
import { FormGroup } from '@angular/forms';

describe('OffboardingModalComponent', () => {
  let component: OffboardingModalComponent;
  let fixture: ComponentFixture<OffboardingModalComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<OffboardingModalComponent>>;
  let formService: OffboardingFormService;

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [OffboardingModalComponent, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        OffboardingFormService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OffboardingModalComponent);
    component = fixture.componentInstance;
    formService = TestBed.inject(OffboardingFormService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
    it('should not close dialog when form is invalid', () => {
      spyOn(formService, 'markFormGroupTouched');
      component.onSubmit();
      expect(dialogRef.close).not.toHaveBeenCalled();
      expect(formService.markFormGroupTouched).toHaveBeenCalledWith(component.form);
    });

    it('should close dialog with form value when form is valid', () => {
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
      expect(dialogRef.close).toHaveBeenCalledWith(validFormValue);
    });
  });

  describe('Error Display', () => {
    it('should show validation messages when form is submitted with errors', () => {
      spyOn(formService, 'markFormGroupTouched').and.callThrough();
      component.onSubmit();
      fixture.detectChanges();

      const errorElements = fixture.debugElement.queryAll(By.css('mat-error'));
      expect(errorElements.length).toBe(7);
      expect(formService.markFormGroupTouched).toHaveBeenCalled();
    });

    it('should not show validation messages initially', () => {
      const errorElements = fixture.debugElement.queryAll(By.css('mat-error'));
      expect(errorElements.length).toBe(0);
    });
  });

  describe('Cancel Button', () => {
    it('should close dialog when cancel button is clicked', () => {
      const cancelButton = fixture.debugElement.query(
        By.css('button[type="button"]')
      );
      cancelButton.nativeElement.click();
      expect(dialogRef.close).toHaveBeenCalled();
    });
  });
});
