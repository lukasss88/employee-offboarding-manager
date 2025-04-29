import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { OffboardingFormComponent } from '../offboarding-form/offboarding-form.component';

@Component({
  selector: 'app-offboarding-modal',
  standalone: true,
  imports: [MatDialogModule, OffboardingFormComponent],
  templateUrl: './offboarding-modal.component.html',
  styleUrl: './offboarding-modal.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffboardingModalComponent {
  readonly dialogRef = inject(MatDialogRef<OffboardingModalComponent>);

  onSubmit(formValue: any): void {
    this.dialogRef.close(formValue);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
