import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../../../core/services/employee.service';
import { EmployeeListComponent } from "../../components/employee-list/employee-list.component";
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-employees-page',
  imports: [EmployeeListComponent, AsyncPipe],
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.sass']
})
export class EmployeesPageComponent {
  private employeeService = inject(EmployeeService);
  employees$ = this.employeeService.getEmployees();
}
