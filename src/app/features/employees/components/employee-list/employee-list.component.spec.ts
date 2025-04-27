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
    const employeeList =
      fixture.nativeElement.querySelectorAll('tr.mat-mdc-row');
    expect(employeeList.length).toBe(mockEmployees.length);

    const firstEmployeeName = fixture.nativeElement.querySelector(
      'tr.mat-mdc-row td.mat-column-name'
    );
    const secondEmployeeName = fixture.nativeElement.querySelectorAll(
      'tr.mat-mdc-row td.mat-column-name'
    )[1];

    expect(firstEmployeeName.textContent).toContain(mockEmployees[0].name);
    expect(secondEmployeeName.textContent).toContain(mockEmployees[1].name);
  });

  it('shhould show empty placheholder when no employees', () => {
    fixture.componentRef.setInput('employees', []);
    fixture.detectChanges();
    const employeeList = fixture.nativeElement.querySelector(
      'tr.mat-mdc-no-data-row'
    );
    expect(employeeList.textContent).toContain('No employees found');
  });

  it('should emit rowClick output when row is clicked', () => {
    const firstRow = fixture.nativeElement.querySelector('tr.mat-mdc-row');
    const rowClickSpy = spyOn(component.rowClick, 'emit');

    firstRow.click();

    expect(rowClickSpy).toHaveBeenCalledWith(mockEmployees[0].id);
  });
});
