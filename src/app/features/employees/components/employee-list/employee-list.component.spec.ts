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
    const employeeRows = queryEmployeeRows();
    expect(employeeRows.length).toBe(mockEmployees.length);

    const firstEmployeeName = queryNameCellAt(0);
    const secondEmployeeName = queryNameCellAt(1);

    expect(firstEmployeeName.textContent).toContain(mockEmployees[0].name);
    expect(secondEmployeeName.textContent).toContain(mockEmployees[1].name);
  });

  it('shhould show empty placheholder when no employees', () => {
    fixture.componentRef.setInput('employees', []);
    fixture.detectChanges();
    const emptyRow = queryEmptyRow();
    expect(emptyRow.textContent).toContain('No employees found');
  });

  it('should emit rowClick output when row is clicked', () => {
    const firstRow = queryFirstRow();
    const rowClickSpy = spyOn(component.rowClick, 'emit');

    firstRow.click();

    expect(rowClickSpy).toHaveBeenCalledWith(mockEmployees[0].id);
  });

  function queryEmployeeRows() {
    return fixture.nativeElement.querySelectorAll('tr.mat-mdc-row');
  }

  function queryNameCellAt(index: number) {
    return fixture.nativeElement.querySelectorAll(
      'tr.mat-mdc-row td.mat-column-name'
    )[index];
  }

  function queryEmptyRow() {
    return fixture.nativeElement.querySelector('tr.mat-mdc-no-data-row');
  }

  function queryFirstRow() {
    return fixture.nativeElement.querySelector('tr.mat-mdc-row');
  }
});
