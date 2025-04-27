import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeStateService } from '../../../../core/services/employee-state.service';
import { CommonModule } from '@angular/common';
import { EmployeeDetailsComponent } from '../../components/employee-details/employee-details.component';
import { EmployeeOffboardEvent } from '../../../../core/models/employee';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from '../../../../shared/services/snackbar.service';

@Component({
  selector: 'app-employee-details-page',
  imports: [CommonModule, EmployeeDetailsComponent, MatSnackBarModule],
  templateUrl: './employee-details-page.component.html',
  styleUrl: './employee-details-page.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailsPageComponent implements OnInit {
  private destroyRef: DestroyRef = inject(DestroyRef);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  state = inject(EmployeeStateService);
  private snackbarService = inject(SnackbarService);
  employee = this.state.currentEmployee;

  ngOnInit(): void {
    const employeeId = this.route.snapshot.params['id'];
    this.state.setCurrentEmployee(employeeId);
  }

  handleOffBoardEmployee(event: EmployeeOffboardEvent): void {
    this.state
      .offBoardEmployee(event.id, event.request)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.snackbarService.showSuccess('Employee successfully offboarded');
          this.router.navigate(['/employees']);
        },
      });
  }
}
