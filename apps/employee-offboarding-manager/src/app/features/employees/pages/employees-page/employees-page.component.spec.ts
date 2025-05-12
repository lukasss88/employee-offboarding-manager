import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeesPageComponent } from './employees-page.component';
import { mockEmployees } from '@shared/testing';
import { By } from '@angular/platform-browser';
import { EmployeeListComponent } from '../../components/employee-list/employee-list.component';
import { Router } from '@angular/router';
import { SearchBarComponent } from '@shared/ui';
import { EmployeeFilterPipe } from '@shared/pipes';
import { EmployeeStateService } from '../../../../core/services/employee-state.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';

describe('EmployeesPageComponent', () => {
  let component: EmployeesPageComponent;
  let fixture: ComponentFixture<EmployeesPageComponent>;
  let employeeStateService: jasmine.SpyObj<EmployeeStateService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    employeeStateService = jasmine.createSpyObj('EmployeeStateService', [], {
      employees: signal(mockEmployees),
    });

    await TestBed.configureTestingModule({
      imports: [
        EmployeesPageComponent,
        EmployeeListComponent,
        SearchBarComponent,
        EmployeeFilterPipe,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: EmployeeStateService, useValue: employeeStateService },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display EmployeeList Component with employees', () => {
    const employeeList = queryEmployeeList();
    expect(employeeList).toBeTruthy();
    expect(employeeList.componentInstance.employees()).toEqual(mockEmployees);
  });

  it('should navigate to employee details when row is clicked', () => {
    const employeeList = queryEmployeeList();
    const employeeListInstance = employeeList.componentInstance;

    employeeListInstance.rowClick.emit(mockEmployees[0].id);

    expect(routerSpy.navigate).toHaveBeenCalledWith([
      '/employees',
      mockEmployees[0].id,
    ]);
  });

  it('should render the search bar component', () => {
    const searchBar = querySearchBar();
    expect(searchBar).toBeTruthy();
  });

  it('should update searchTerm when search event is emitted', () => {
    const testSearchTerm = 'test search';
    const searchBar = querySearchBar();

    expect(component.searchTerm()).toBe('');

    searchBar.componentInstance.termChange.emit(testSearchTerm);

    expect(component.searchTerm()).toBe(testSearchTerm);
  });

  it('should filter employees based on searchTerm', () => {
    const searchBar = querySearchBar();

    searchBar.componentInstance.termChange.emit('John');
    fixture.detectChanges();

    const rows = queryTableRows();
    expect(rows.length).toBe(1);
    const nameCell = rows[0].query(By.css('td.mat-column-name'));
    expect(nameCell.nativeElement.textContent.trim()).toBe('John Doe');
  });

  it('should show all employees when search is cleared', () => {
    component.handleSearch('John');
    fixture.detectChanges();

    component.handleSearch('');
    fixture.detectChanges();

    const rows = queryTableRows();
    expect(rows.length).toBe(mockEmployees.length);
  });

  it('should show no results message when search has no matches', () => {
    component.handleSearch('NonExistentEmployee');
    fixture.detectChanges();

    const noDataRow = queryNoDataRow();
    expect(noDataRow).toBeTruthy();
    expect(noDataRow.nativeElement.textContent.trim()).toContain(
      'No employees found'
    );
  });

  function queryEmployeeList() {
    return fixture.debugElement.query(By.directive(EmployeeListComponent));
  }

  function querySearchBar() {
    return fixture.debugElement.query(By.directive(SearchBarComponent));
  }

  function queryTableRows() {
    return fixture.debugElement.queryAll(By.css('tr.mat-mdc-row'));
  }

  function queryNoDataRow() {
    return fixture.debugElement.query(By.css('tr.mat-mdc-no-data-row'));
  }
});
