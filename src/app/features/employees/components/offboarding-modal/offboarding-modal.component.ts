import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { OffboardingFormData } from '../offboarding-form/offboarding-form.model';
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

  onFormSubmit(formData: OffboardingFormData): void {
    this.dialogRef.close(formData);
  }

  onFormCancel(): void {
    this.dialogRef.close();
  }
}
