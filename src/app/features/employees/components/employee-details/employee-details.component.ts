import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Employee } from '../../../../core/models/employee';

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
})
export class EmployeeDetailsComponent {
  employee = input.required<Employee>();
}
