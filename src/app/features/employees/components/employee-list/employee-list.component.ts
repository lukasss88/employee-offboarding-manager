import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Employee } from '../../../../core/models/employee';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  navigateToDetails(employeeId: string): void {
    this.router.navigate(['/employees', employeeId]);
  }
}
