import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EmployeeDetailsPageComponent } from './employee-details-page.component';
import { mockEmployees } from '../../../../shared/testing/test-data/mock-employees';
import { EmployeeStateService } from '../../../../core/services/employee-state.service';
import { computed } from '@angular/core';

describe('EmployeeDetailsPageComponent', () => {
  let component: EmployeeDetailsPageComponent;
  let fixture: ComponentFixture<EmployeeDetailsPageComponent>;
  let mockEmployeeStateService: {
    employees: any;
    setCurrentEmployee: jasmine.Spy;
    currentEmployee: any;
  };

  beforeEach(async () => {
    mockEmployeeStateService = {
      employees: computed(() => mockEmployees),
      setCurrentEmployee: jasmine.createSpy('setCurrentEmployee'),
      currentEmployee: computed(() => mockEmployees[0]),
    };

    await TestBed.configureTestingModule({
      imports: [EmployeeDetailsPageComponent],
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

  it('should get employee id from route params on init', () => {
    expect(mockEmployeeStateService.setCurrentEmployee).toHaveBeenCalledWith(
      mockEmployees[0].id
    );
  });

  it('should call setCurrentEmployee with the correct id', () => {
    // Reset the spy count since ngOnInit already called it once
    mockEmployeeStateService.setCurrentEmployee.calls.reset();

    // Trigger ngOnInit again
    component.ngOnInit();

    expect(mockEmployeeStateService.setCurrentEmployee).toHaveBeenCalledWith(
      mockEmployees[0].id
    );
    expect(mockEmployeeStateService.setCurrentEmployee).toHaveBeenCalledTimes(
      1
    );
  });

  it('should display the employee details', () => {
    const employeeDetailsName = fixture.nativeElement.querySelector('.employee-details .name');
    const emmployeeDetailsDepartment = fixture.nativeElement.querySelector('.employee-details .department');
    const employeeDetailsEmail = fixture.nativeElement.querySelector('.employee-details .email');
    const employeeEquipment = fixture.nativeElement.querySelectorAll('.employee-details .equipments li');

    expect(employeeDetailsName.textContent).toContain(mockEmployees[0].name);
    expect(emmployeeDetailsDepartment.textContent).toContain(mockEmployees[0].department);
    expect(employeeDetailsEmail.textContent).toContain(mockEmployees[0].email);
    expect(employeeEquipment.length).toBe(mockEmployees[0].equipments.length);
    expect(employeeEquipment[0].textContent).toContain(mockEmployees[0].equipments[0]);
  });
});
