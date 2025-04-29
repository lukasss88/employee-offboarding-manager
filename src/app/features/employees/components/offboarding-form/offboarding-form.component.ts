import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  input,
  output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OffboardingFormService } from '../../services/offboarding-form.service';

@Component({
  selector: 'app-offboarding-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './offboarding-form.component.html',
  styleUrl: './offboarding-form.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffboardingFormComponent implements OnInit {
  private formService = inject(OffboardingFormService);

  showActions = input(true);
  formSubmit = output<any>();
  formCancel = output<void>();

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formService.createForm();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.formService.markFormGroupTouched(this.form);
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }
}
