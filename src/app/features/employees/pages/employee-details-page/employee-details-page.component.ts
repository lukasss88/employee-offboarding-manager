import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeStateService } from '../../../../core/services/employee-state.service';
import { CommonModule } from '@angular/common';
import { EmployeeDetailsComponent } from "../../components/employee-details/employee-details.component";

@Component({
  selector: 'app-employee-details-page',
  standalone: true,
  imports: [
    CommonModule,
    EmployeeDetailsComponent
],
  templateUrl: './employee-details-page.component.html',
  styleUrl: './employee-details-page.component.sass',
})
export class EmployeeDetailsPageComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  state = inject(EmployeeStateService);
  employee = this.state.currentEmployee;
  isLoading = this.state.isLoading;

  ngOnInit(): void {
    const employeeId = this.route.snapshot.params['id'];
    this.state.setCurrentEmployee(employeeId);
  }
}
