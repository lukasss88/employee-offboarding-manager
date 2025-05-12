import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {
  Employee,
  EmployeeOffboardEvent,
} from '../../../../core/models/employee';

@Component({
  selector: 'app-employee-details',
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailsComponent {
  employee = input.required<Employee>();
  offBoardEmployee = output<EmployeeOffboardEvent>();
  requestOffboarding = output<void>();

  triggerOffboarding(): void {
    this.requestOffboarding.emit();
  }
}
