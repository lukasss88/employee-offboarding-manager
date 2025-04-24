import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeStateService } from '../../../../core/services/employee-state.service';

@Component({
  selector: 'app-employee-details-page',
  imports: [],
  templateUrl: './employee-details-page.component.html',
  styleUrl: './employee-details-page.component.sass',
})
export class EmployeeDetailsPageComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  state = inject(EmployeeStateService);
  employee = this.state.currentEmployee();

  ngOnInit(): void {
    const employeeId = this.route.snapshot.params['id'];
    this.state.setCurrentEmployee(employeeId);
  }
}
