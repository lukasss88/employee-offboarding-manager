import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Employee, EmployeeOffboardEvent } from '../../../../core/models/employee';
import { MatDialog } from '@angular/material/dialog';
import { OffboardingModalComponent } from '../offboarding-modal/offboarding-modal.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  readonly dialog = inject(MatDialog);
  readonly destroyRef = inject(DestroyRef);
  employee = input.required<Employee>();
  offBoardEmployee = output<EmployeeOffboardEvent>();

  openModal() {
    const dialogRef = this.dialog.open(OffboardingModalComponent);

    dialogRef.afterClosed()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((result) => {
      if (result) {
        this.offBoardEmployee.emit({
          id: this.employee().id,
          request: result,
        });
      }
    });


  }
}
