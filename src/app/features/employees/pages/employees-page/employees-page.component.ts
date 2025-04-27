import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EmployeeListComponent } from '../../components/employee-list/employee-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { EmployeeStateService } from '../../../../core/services/employee-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees-page',
  imports: [EmployeeListComponent, MatTabsModule],
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesPageComponent {
  private state = inject(EmployeeStateService);
  private router = inject(Router);

  employees = this.state.employees;

  handleRowClick(employeeId: string): void {
    this.router.navigate(['/employees', employeeId]);
  }
}
