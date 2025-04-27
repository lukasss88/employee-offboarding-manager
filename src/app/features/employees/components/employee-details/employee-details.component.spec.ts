import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeDetailsComponent } from './employee-details.component';
import { mockEmployees } from '../../../../shared/testing/test-data/mock-employees';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OffboardingModalComponent } from '../offboarding-modal/offboarding-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('EmployeeDetailsComponent', () => {
  let component: EmployeeDetailsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponent>;
  let dialog: MatDialog;
  let dialogRef: jasmine.SpyObj<MatDialogRef<OffboardingModalComponent>>;

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRef.afterClosed.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      imports: [
        EmployeeDetailsComponent,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        OffboardingModalComponent,
      ],
      providers: [
        provideRouter([]),
        {
          provide: MatDialog,
          useValue: {
            open: jasmine.createSpy('open').and.returnValue(dialogRef),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    fixture.componentRef.setInput('employee', mockEmployees[0]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display employee details correctly', () => {
    const nameElement = fixture.debugElement.query(By.css('h1'));
    const departmentElement = fixture.debugElement.query(
      By.css('.detail-row:nth-child(2) .value')
    );
    const emailElement = fixture.debugElement.query(
      By.css('.detail-row:nth-child(3) .value')
    );

    expect(nameElement.nativeElement.textContent).toContain(
      mockEmployees[0].name
    );
    expect(departmentElement.nativeElement.textContent).toContain(
      mockEmployees[0].department
    );
    expect(emailElement.nativeElement.textContent).toContain(
      mockEmployees[0].email
    );
  });

  it('should have a back link to employees page', () => {
    const backLink = fixture.debugElement.query(By.css('.back-link'));
    expect(backLink.attributes['routerLink']).toBe('/employees');
  });

  describe('when offboard button is clicked', () => {
    it('should open the offboard modal', () => {
      const offboardButton = fixture.debugElement.query(
        By.css('#offboard-button')
      );
      offboardButton.nativeElement.click();

      expect(dialog.open).toHaveBeenCalledWith(OffboardingModalComponent);
    });

    it('should emit offboard event when modal returns result', () => {
      const mockOffboardRequest = {
        address: {
          streetLine1: '123 Test St',
          country: 'Test Country',
          postalCode: '12345',
          receiver: 'Test Receiver',
        },
        notes: 'Test notes',
        phone: '123456789',
        email: 'test@test.com',
      };

      dialogRef.afterClosed.and.returnValue(of(mockOffboardRequest));
      const offboardSpy = spyOn(component.offBoardEmployee, 'emit');

      const offboardButton = fixture.debugElement.query(
        By.css('#offboard-button')
      );
      offboardButton.nativeElement.click();

      expect(offboardSpy).toHaveBeenCalledWith({
        id: mockEmployees[0].id,
        request: mockOffboardRequest,
      });
    });

    it('should not emit offboard event when modal is cancelled', () => {
      dialogRef.afterClosed.and.returnValue(of(null));
      const offboardSpy = spyOn(component.offBoardEmployee, 'emit');

      const offboardButton = fixture.debugElement.query(
        By.css('#offboard-button')
      );
      offboardButton.nativeElement.click();

      expect(offboardSpy).not.toHaveBeenCalled();
    });
  });
});
