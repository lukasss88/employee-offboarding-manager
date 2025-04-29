import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OffboardingFormComponent } from './offboarding-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { OffboardingFormService } from '../../services/offboarding-form.service';

describe('OffboardingFormComponent', () => {
  let component: OffboardingFormComponent;
  let fixture: ComponentFixture<OffboardingFormComponent>;
  let formService: OffboardingFormService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffboardingFormComponent, BrowserAnimationsModule],
      providers: [OffboardingFormService],
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
    it('should initialize the form on init', () => {
      expect(component.form).toBeTruthy();
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
  });

  describe('Form Submission', () => {
    it('should not emit formSubmit when form is invalid', () => {
      spyOn(component.formSubmit, 'emit');
      spyOn(formService, 'markFormGroupTouched');
      component.onSubmit();
      expect(component.formSubmit.emit).not.toHaveBeenCalled();
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

  describe('Cancel Button', () => {
    it('should emit formCancel when cancel button is clicked', () => {
      spyOn(component.formCancel, 'emit');
      component.onCancel();
      expect(component.formCancel.emit).toHaveBeenCalled();
    });

    it('should hide action buttons when showActions is false', () => {
      fixture.componentRef.setInput('showActions', false);
      fixture.detectChanges();
      const actionButtons = fixture.debugElement.query(By.css('.form-actions'));
      expect(actionButtons).toBeNull();
    });

    it('should show action buttons when showActions is true', () => {
      fixture.componentRef.setInput('showActions', true);
      fixture.detectChanges();
      const actionButtons = fixture.debugElement.query(By.css('.form-actions'));
      expect(actionButtons).toBeTruthy();
    });
  });
});
