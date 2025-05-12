import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  inject,
} from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { OffboardingFormComponent } from '../offboarding-form/offboarding-form.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-offboarding-modal',
  standalone: true,
  imports: [MatDialogModule, OffboardingFormComponent, MatButtonModule],
  templateUrl: './offboarding-modal.component.html',
  styleUrl: './offboarding-modal.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffboardingModalComponent {
  readonly dialogRef = inject(MatDialogRef<OffboardingModalComponent>);

  @ViewChild(OffboardingFormComponent) formComponent!: OffboardingFormComponent;

  onSubmit(formValue: any): void {
    this.dialogRef.close(formValue);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    if (this.formComponent) {
      this.formComponent.onSubmit();
    }
  }
}
