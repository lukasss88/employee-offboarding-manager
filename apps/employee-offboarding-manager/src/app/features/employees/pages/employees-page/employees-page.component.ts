import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { EmployeeListComponent } from '../../components/employee-list/employee-list.component';
import { EmployeeStateService } from '../../../../core/services/employee-state.service';
import { Router } from '@angular/router';
import { EmployeeFilterPipe } from '../../../../shared/pipes/employee-filter.pipe';
import { SearchBarComponent } from '@shared/ui';

@Component({
  selector: 'app-employees-page',
  imports: [
    EmployeeListComponent,
    EmployeeFilterPipe,
    SearchBarComponent,
  ],
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesPageComponent {
  private state = inject(EmployeeStateService);
  private router = inject(Router);

  employees = this.state.employees;
  searchTerm = signal('');

  handleRowClick(employeeId: string): void {
    this.router.navigate(['/employees', employeeId]);
  }

  handleSearch(term: string): void {
    this.searchTerm.set(term);
  }
}
