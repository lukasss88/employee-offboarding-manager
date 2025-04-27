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

describe('EmployeeDetailsPageComponent', () => {
  let component: EmployeeDetailsPageComponent;
  let fixture: ComponentFixture<EmployeeDetailsPageComponent>;
  let mockEmployeeStateService: {
    setCurrentEmployee: jasmine.Spy;
    offBoardEmployee: jasmine.Spy;
    currentEmployee: any;
    isLoading: any;
  };
  let mockSnackbarService: {
    showSuccess: jasmine.Spy;
  };
  let router: Router;
  let navigateSpy: jasmine.Spy;

  beforeEach(async () => {
    mockEmployeeStateService = {
      setCurrentEmployee: jasmine.createSpy('setCurrentEmployee'),
      offBoardEmployee: jasmine
        .createSpy('offBoardEmployee')
        .and.returnValue(of(mockEmployees[0])),
      currentEmployee: signal(mockEmployees[0]),
      isLoading: signal(false),
    };

    mockSnackbarService = {
      showSuccess: jasmine.createSpy('showSuccess'),
    };

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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display employee-details component when employee exists', () => {
    const employeeDetails = fixture.debugElement.query(
      By.directive(EmployeeDetailsComponent)
    );

    expect(employeeDetails).toBeTruthy();
    expect(employeeDetails.componentInstance.employee()).toEqual(
      mockEmployees[0]
    );
  });

  it('should not display employee-details component when employee is null', () => {
    mockEmployeeStateService.currentEmployee.set(null);
    fixture.detectChanges();

    const employeeDetails = fixture.debugElement.query(
      By.directive(EmployeeDetailsComponent)
    );

    expect(employeeDetails).toBeFalsy();
  });

  it('should call setCurrentEmployee with the id from route params', () => {
    expect(mockEmployeeStateService.setCurrentEmployee).toHaveBeenCalledWith(
      mockEmployees[0].id
    );
  });

  it('should show loading state when isLoading is true', () => {
    mockEmployeeStateService.isLoading.set(true);
    fixture.detectChanges();

    // TODO: fix selector
    const loadingElement = fixture.nativeElement.querySelector(
      'div.page-container > div'
    );
    expect(loadingElement.textContent).toContain('Loading...');
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
});
