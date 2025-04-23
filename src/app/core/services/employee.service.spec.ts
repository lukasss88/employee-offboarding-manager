import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { API_URL } from '../tokens/api.token';
import { Employee } from '../models/employee';
import { mockEmployees } from '../../shared/testing/test-data/mock-employees';
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
        { provide: API_URL, useValue: 'assets/data.json' },
      ],
    });
    service = TestBed.inject(EmployeeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('getEmployees', () => {
    it('should return expected employees', (done: DoneFn) => {
      service.getEmployees().subscribe({
        next: (employees: Employee[]) => {
          expect(employees)
            .withContext('expected employees')
            .toEqual(mockEmployees);
          done();
        },
        error: done.fail,
      });

      const req = httpTestingController.expectOne('assets/data.json');
      expect(req.request.method).toEqual('GET');
      req.flush(mockEmployees);
    });

    it('should return an error when the server returns a 404', (done: DoneFn) => {
      service.getEmployees().subscribe({
        next: (employees) => done.fail('expected an error, not employees'),
        error: (error) => {
          expect(error).toBe(
            'Server Error: 404 - Http failure response for assets/data.json: 404 Not Found'
          );
          done();
        },
      });

      const req = httpTestingController.expectOne('assets/data.json');
      req.flush('test 404 error', { status: 404, statusText: 'Not Found' });
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
