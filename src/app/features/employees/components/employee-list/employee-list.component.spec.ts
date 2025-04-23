import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListComponent } from './employee-list.component';
import { mockEmployees } from '../../../../shared/testing/test-data/mock-employees';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('employees', mockEmployees);
    fixture.detectChanges();
  });

  it('should show employee list', () => {
    const employeeList = fixture.nativeElement.querySelectorAll('li.employee-list-item');
    expect(employeeList.length).toBe(mockEmployees.length);
    expect(employeeList[0].textContent).toContain(mockEmployees[0].name);
    expect(employeeList[1].textContent).toContain(mockEmployees[1].name);
  });

  it('shhould show empty placheholder when no employees', () => {
    fixture.componentRef.setInput('employees', []);
    fixture.detectChanges();
    const employeeList = fixture.nativeElement.querySelector('.empty-placeholder');
    expect(employeeList.textContent).toContain('No employees found');
  });
});
