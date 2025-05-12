import { TestBed } from '@angular/core/testing';
import { EmployeeStateService } from './employee-state.service';
import { EmployeeService } from './employee.service';
import { of } from 'rxjs';
import { mockEmployees } from '@shared/testing';

describe('EmployeeStateService', () => {
  let service: EmployeeStateService;
  let employeeServiceSpy: jasmine.SpyObj<EmployeeService>;

  beforeEach(() => {
    employeeServiceSpy = jasmine.createSpyObj('EmployeeService', [
      'getEmployees',
    ]);
    employeeServiceSpy.getEmployees.and.returnValue(of(mockEmployees));

    TestBed.configureTestingModule({
      providers: [
        EmployeeStateService,
        { provide: EmployeeService, useValue: employeeServiceSpy },
      ],
    });
    service = TestBed.inject(EmployeeStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load employees on init', () => {
    expect(employeeServiceSpy.getEmployees).toHaveBeenCalled();
    expect(service.employees()).toEqual(mockEmployees);
  });

  describe('setCurrentEmployee', () => {
    it('should set current employee when valid id provided', () => {
      service.setCurrentEmployee('1');
      expect(service.currentEmployee()).toEqual(mockEmployees[0]);
    });

    it('should throw error when invalid id provided', () => {
      expect(() => service.setCurrentEmployee('999')).toThrow(
        new Error('Employee with id 999 not found')
      );
    });

    it('should set pendingEmployeeId when loading', () => {
      service.setLoading(true);
      service.setCurrentEmployee('1');
      expect(service.pendingEmployeeId()).toEqual('1');
    });
  });
});
