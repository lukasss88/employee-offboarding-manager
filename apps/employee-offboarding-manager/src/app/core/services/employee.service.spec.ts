import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { API_URL } from '../tokens/api.token';
import { Employee, EmployeeOffboardRequest } from '../models/employee';
import { mockEmployees } from '@shared/testing';
import { httpErrorInterceptor } from '../interceptors/http-error.interceptor';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmployeeService,
        provideHttpClient(withInterceptors([httpErrorInterceptor])),
        provideHttpClientTesting(),
        { provide: API_URL, useValue: 'api/employees' },
      ],
    });
    service = TestBed.inject(EmployeeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getEmployees', () => {
    it('should return employees list', () => {
      service.getEmployees().subscribe((employees) => {
        expect(employees).toEqual(mockEmployees);
      });

      const req = httpTestingController.expectOne('api/employees');
      expect(req.request.method).toBe('GET');
      req.flush(mockEmployees);
    });

    it('should handle error', () => {
      service.getEmployees().subscribe({
        error: (error) => {
          expect(error).toContain('404');
        },
      });

      const req = httpTestingController.expectOne('api/employees');
      req.flush('test 404 error', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('offBoardEmployee', () => {
    const mockOffboardRequest: EmployeeOffboardRequest = {
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

    it('should send offboard request and return updated employee', () => {
      const employeeId = mockEmployees[0].id;
      const updatedEmployee: Employee = {
        ...mockEmployees[0],
        status: 'OFFBOARDED' as const,
      };

      service
        .offBoardEmployee(employeeId, mockOffboardRequest)
        .subscribe((employee) => {
          expect(employee).toEqual(updatedEmployee);
        });

      const req = httpTestingController.expectOne(
        `api/employees/${employeeId}/offboard`
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockOffboardRequest);
      req.flush(updatedEmployee);
    });

    it('should handle error during offboarding', () => {
      const employeeId = mockEmployees[0].id;

      service.offBoardEmployee(employeeId, mockOffboardRequest).subscribe({
        error: (error) => {
          expect(error).toContain('500');
        },
      });

      const req = httpTestingController.expectOne(
        `api/employees/${employeeId}/offboard`
      );
      req.flush('Server error', {
        status: 500,
        statusText: 'Internal Server Error',
      });
    });
  });
});
