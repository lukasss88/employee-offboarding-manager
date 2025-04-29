import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OffboardingFormService } from '../../services/offboarding-form.service';

@Component({
  selector: 'app-offboarding-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './offboarding-modal.component.html',
  styleUrl: './offboarding-modal.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffboardingModalComponent {
  readonly dialogRef = inject(MatDialogRef<OffboardingModalComponent>);
  private formService = inject(OffboardingFormService);

  form: FormGroup = this.formService.createForm();

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    } else {
      this.formService.markFormGroupTouched(this.form);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
