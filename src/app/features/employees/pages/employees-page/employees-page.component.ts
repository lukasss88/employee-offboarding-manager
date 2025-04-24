import { Component, inject } from '@angular/core';
import { EmployeeListComponent } from '../../components/employee-list/employee-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { EmployeeStateService } from '../../../../core/services/employee-state.service';

@Component({
  selector: 'app-employees-page',
  imports: [EmployeeListComponent, MatTabsModule],
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.sass'],
})
export class EmployeesPageComponent {
  private state = inject(EmployeeStateService);
  employees = this.state.employees();
}
