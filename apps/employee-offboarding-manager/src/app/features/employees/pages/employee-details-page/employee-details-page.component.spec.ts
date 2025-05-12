import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { EmployeeDetailsPageComponent } from './employee-details-page.component';
import { mockEmployees } from '../../../../shared/testing/test-data/mock-employees';
import { EmployeeStateService } from '../../../../core/services/employee-state.service';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { EmployeeDetailsComponent } from '../../components/employee-details/employee-details.component';
import { of } from 'rxjs';
import { EmployeeOffboardEvent } from '../../../../core/models/employee';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OffboardingModalComponent } from '../../components/offboarding-modal/offboarding-modal.component';

describe('EmployeeDetailsPageComponent', () => {
  let component: EmployeeDetailsPageComponent;
  let fixture: ComponentFixture<EmployeeDetailsPageComponent>;
  let mockEmployeeStateService: {
    setCurrentEmployee: jasmine.Spy;
    offBoardEmployee: jasmine.Spy;
    currentEmployee: any;
  };
  let mockSnackbarService: {
    showSuccess: jasmine.Spy;
  };
  let router: Router;
  let navigateSpy: jasmine.Spy;
  let dialog: MatDialog;
  let dialogRef: jasmine.SpyObj<MatDialogRef<OffboardingModalComponent>>;

  beforeEach(async () => {
    mockEmployeeStateService = {
      setCurrentEmployee: jasmine.createSpy('setCurrentEmployee'),
      offBoardEmployee: jasmine
        .createSpy('offBoardEmployee')
        .and.returnValue(of(mockEmployees[0])),
      currentEmployee: signal(mockEmployees[0]),
    };

    mockSnackbarService = {
      showSuccess: jasmine.createSpy('showSuccess'),
    };

    dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRef.afterClosed.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      imports: [EmployeeDetailsPageComponent, EmployeeDetailsComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: mockEmployees[0].id },
            },
          },
        },
        { provide: EmployeeStateService, useValue: mockEmployeeStateService },
        { provide: SnackbarService, useValue: mockSnackbarService },
        {
          provide: MatDialog,
          useValue: {
            open: jasmine.createSpy('open').and.returnValue(dialogRef),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
    navigateSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display employee-details component when employee exists', () => {
    const employeeDetails = queryEmployeeDetailsComponent();

    expect(employeeDetails).toBeTruthy();
    expect(employeeDetails.componentInstance.employee()).toEqual(
      mockEmployees[0]
    );
  });

  it('should not display employee-details component when employee is null', () => {
    mockEmployeeStateService.currentEmployee.set(null);
    fixture.detectChanges();

    const employeeDetails = queryEmployeeDetailsComponent();

    expect(employeeDetails).toBeFalsy();
  });

  it('should call setCurrentEmployee with the id from route params', () => {
    expect(mockEmployeeStateService.setCurrentEmployee).toHaveBeenCalledWith(
      mockEmployees[0].id
    );
  });

  describe('handleOpenOffboardingModal', () => {
    it('should open the offboarding modal dialog', () => {
      component.handleOpenOffboardingModal();

      expect(dialog.open).toHaveBeenCalledWith(OffboardingModalComponent);
    });

    it('should call handleOffBoardEmployee when modal returns a result', () => {
      const mockOffboardRequest = {
        address: {
          receiver: 'Test Receiver',
          streetLine1: '123 Test St',
          city: 'Test City',
          postalCode: '12345',
          country: 'Test Country',
        },
        email: 'test@example.com',
        phone: '123456789',
        notes: 'Test notes',
      };

      dialogRef.afterClosed.and.returnValue(of(mockOffboardRequest));
      spyOn(component, 'handleOffBoardEmployee');

      component.handleOpenOffboardingModal();

      expect(component.handleOffBoardEmployee).toHaveBeenCalledWith({
        id: mockEmployees[0].id,
        request: mockOffboardRequest,
      });
    });

    it('should not call handleOffBoardEmployee when modal is cancelled', () => {
      dialogRef.afterClosed.and.returnValue(of(null));
      spyOn(component, 'handleOffBoardEmployee');

      component.handleOpenOffboardingModal();

      expect(component.handleOffBoardEmployee).not.toHaveBeenCalled();
    });
  });

  it('should redirect to employees list after successful offboarding', () => {
    const offboardEvent: EmployeeOffboardEvent = {
      id: mockEmployees[0].id,
      request: {
        address: {
          streetLine1: '123 Test St',
          country: 'Test Country',
          postalCode: '12345',
          receiver: 'Test Receiver',
        },
        notes: 'Offboarding notes',
        phone: '123-456-7890',
        email: 'test@example.com',
      },
    };

    component.handleOffBoardEmployee(offboardEvent);

    expect(mockEmployeeStateService.offBoardEmployee).toHaveBeenCalledWith(
      offboardEvent.id,
      offboardEvent.request
    );
    expect(mockSnackbarService.showSuccess).toHaveBeenCalledWith(
      'Employee successfully offboarded'
    );
    expect(navigateSpy).toHaveBeenCalledWith(['/employees']);
  });

  function queryEmployeeDetailsComponent() {
    return fixture.debugElement.query(By.directive(EmployeeDetailsComponent));
  }
});
