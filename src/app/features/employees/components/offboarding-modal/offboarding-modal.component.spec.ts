import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OffboardingModalComponent } from './offboarding-modal.component';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OffboardingFormData } from '../offboarding-form/offboarding-form.model';

// Mock OffboardingFormComponent
@Component({
  selector: 'app-offboarding-form',
  template: '<div>Mock Form Component</div>',
})
class MockOffboardingFormComponent {
  @Input() initialData?: Partial<OffboardingFormData>;
  @Output() formSubmit = new EventEmitter<OffboardingFormData>();
  @Output() formCancel = new EventEmitter<void>();
}

describe('OffboardingModalComponent', () => {
  let component: OffboardingModalComponent;
  let fixture: ComponentFixture<OffboardingModalComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<OffboardingModalComponent>>;
  let mockForm: MockOffboardingFormComponent;

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        OffboardingModalComponent,
        BrowserAnimationsModule,
        MockOffboardingFormComponent,
      ],
      declarations: [],
      providers: [{ provide: MatDialogRef, useValue: dialogRef }],
    }).compileComponents();

    fixture = TestBed.createComponent(OffboardingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const formElement = fixture.debugElement.nativeElement.querySelector(
      'app-offboarding-form'
    );
    mockForm = fixture.debugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Submission', () => {
    it('should close dialog with form data when form is submitted', () => {
      const formData: OffboardingFormData = {
        receiver: 'John Doe',
        email: 'john@example.com',
        phone: '123456789',
        streetLine: '123 Main St',
        city: 'New York',
        postalCode: '10001',
        country: 'USA',
        notes: 'Some notes',
      };

      component.onFormSubmit(formData);
      expect(dialogRef.close).toHaveBeenCalledWith(formData);
    });
  });

  describe('Cancel Button', () => {
    it('should close dialog when form cancel event is emitted', () => {
      component.onFormCancel();
      expect(dialogRef.close).toHaveBeenCalled();
    });
  });
});
