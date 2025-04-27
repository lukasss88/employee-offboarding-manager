import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { EmployeeDetailsPageComponent } from './employee-details-page.component';
import { mockEmployees } from '../../../../shared/testing/test-data/mock-employees';
import { EmployeeStateService } from '../../../../core/services/employee-state.service';
import { computed, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { EmployeeDetailsComponent } from '../../components/employee-details/employee-details.component';

describe('EmployeeDetailsPageComponent', () => {
  let component: EmployeeDetailsPageComponent;
  let fixture: ComponentFixture<EmployeeDetailsPageComponent>;
  let mockEmployeeStateService: {
    setCurrentEmployee: jasmine.Spy;
    currentEmployee: any;
    isLoading: any;
  };

  beforeEach(async () => {
    mockEmployeeStateService = {
      setCurrentEmployee: jasmine.createSpy('setCurrentEmployee'),
      currentEmployee: signal(mockEmployees[0]),
      isLoading: signal(false),
    };

    await TestBed.configureTestingModule({
      imports: [EmployeeDetailsPageComponent, EmployeeDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: mockEmployees[0].id },
            },
          },
        },
        { provide: EmployeeStateService, useValue: mockEmployeeStateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsPageComponent);
    component = fixture.componentInstance;
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
});
