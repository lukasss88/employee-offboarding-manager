import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Employee, EmployeeId } from '../../../../core/models/employee';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-employee-list',
  imports: [MatTableModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent {

  displayedColumns: string[] = [
    'name',
    'email',
    'department',
    'equipment',
    'status',
  ];
  employees = input.required<Employee[]>();
  rowClick = output<EmployeeId>();

  onRowClick(employeeId: string): void {
    this.rowClick.emit(employeeId);
  }


}
