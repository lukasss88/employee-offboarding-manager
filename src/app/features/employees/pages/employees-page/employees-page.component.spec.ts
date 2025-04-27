import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeesPageComponent } from './employees-page.component';
import { EmployeeService } from '../../../../core/services/employee.service';
import { of } from 'rxjs';
import { mockEmployees } from '../../../../shared/testing/test-data/mock-employees';
import { By } from '@angular/platform-browser';
import { EmployeeListComponent } from '../../components/employee-list/employee-list.component';
import { Router } from '@angular/router';

describe('EmployeesPageComponent', () => {
  let component: EmployeesPageComponent;
  let fixture: ComponentFixture<EmployeesPageComponent>;
  let employeeServiceSpy: jasmine.SpyObj<EmployeeService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    employeeServiceSpy = jasmine.createSpyObj('EmployeeService', [
      'getEmployees',
    ]);
    employeeServiceSpy.getEmployees.and.returnValue(of(mockEmployees));

    await TestBed.configureTestingModule({
      imports: [EmployeesPageComponent, EmployeeListComponent],
      providers: [
        { provide: EmployeeService, useValue: employeeServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
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

  it('should navigate to employee details when row is clicked', () => {
    const employeeList = fixture.debugElement.query(
      By.directive(EmployeeListComponent)
    );
    const employeeListInstance = employeeList.componentInstance;
    
    employeeListInstance.rowClick.emit(mockEmployees[0].id);

    expect(routerSpy.navigate).toHaveBeenCalledWith([
      '/employees',
      mockEmployees[0].id,
    ]);
  });
});
