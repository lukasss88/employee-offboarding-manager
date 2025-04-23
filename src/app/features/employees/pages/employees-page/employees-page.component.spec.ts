import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeesPageComponent } from './employees-page.component';
import { EmployeeService } from '../../../../core/services/employee.service';
import { of } from 'rxjs';
import { mockEmployees } from '../../../../shared/testing/test-data/mock-employees';
import { By } from '@angular/platform-browser';
import { EmployeeListComponent } from '../../components/employee-list/employee-list.component';

describe('EmployeesPageComponent', () => {
  let component: EmployeesPageComponent;
  let fixture: ComponentFixture<EmployeesPageComponent>;
  let employeeServiceSpy: jasmine.SpyObj<EmployeeService>;

  beforeEach(async () => {
    employeeServiceSpy = jasmine.createSpyObj('EmployeeService', [
      'getEmployees',
    ]);
    employeeServiceSpy.getEmployees.and.returnValue(of(mockEmployees));

    await TestBed.configureTestingModule({
      imports: [EmployeesPageComponent, EmployeeListComponent],
      providers: [{ provide: EmployeeService, useValue: employeeServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display EmployeeList Component with employees', () => {
    const employeeList = fixture.debugElement.query(
      By.directive(EmployeeListComponent)
    );
    expect(employeeList).toBeTruthy();
    expect(employeeList.componentInstance.employees()).toEqual(mockEmployees);
  });
});
