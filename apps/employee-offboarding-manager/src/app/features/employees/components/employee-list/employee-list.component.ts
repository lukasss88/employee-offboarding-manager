import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Employee, EmployeeId } from '@shared/models';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  imports: [MatTableModule, CommonModule],
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
