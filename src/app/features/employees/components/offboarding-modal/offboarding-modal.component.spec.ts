import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OffboardingModalComponent } from './offboarding-modal.component';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { OffboardingFormComponent } from '../offboarding-form/offboarding-form.component';

describe('OffboardingModalComponent', () => {
  let component: OffboardingModalComponent;
  let fixture: ComponentFixture<OffboardingModalComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<OffboardingModalComponent>>;

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        OffboardingModalComponent,
        BrowserAnimationsModule,
        OffboardingFormComponent,
      ],
      providers: [{ provide: MatDialogRef, useValue: dialogRef }],
    }).compileComponents();

    fixture = TestBed.createComponent(OffboardingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    const title = fixture.debugElement.query(By.css('h2'));
    expect(title.nativeElement.textContent).toBe('Offboard');
  });

  it('should close the dialog with form value when form is submitted', () => {
    const testFormValue = { name: 'Test value' };
    const formComponent = fixture.debugElement.query(
      By.directive(OffboardingFormComponent)
    ).componentInstance;

    formComponent.formSubmit.emit(testFormValue);
    expect(dialogRef.close).toHaveBeenCalledWith(testFormValue);
  });

  it('should close the dialog when form is cancelled', () => {
    const formComponent = fixture.debugElement.query(
      By.directive(OffboardingFormComponent)
    ).componentInstance;

    formComponent.formCancel.emit();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
