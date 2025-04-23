import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Employee } from '../../../../core/models/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent {
  employees = input.required<Employee[]>();
}
