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
import { SnackbarService } from '@shared/ui';
import { MatDialog } from '@angular/material/dialog';
import { OffboardingModalComponent } from '../../components/offboarding-modal/offboarding-modal.component';

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
  private dialog = inject(MatDialog);
  employee = this.state.currentEmployee;

  ngOnInit(): void {
    const employeeId = this.route.snapshot.params['id'];
    this.state.setCurrentEmployee(employeeId);
  }

  handleOpenOffboardingModal(): void {
    const dialogRef = this.dialog.open(OffboardingModalComponent);

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        const currentEmployee = this.employee();
        if (result && currentEmployee) {
          this.handleOffBoardEmployee({
            id: currentEmployee.id,
            request: result,
          });
        }
      });
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
