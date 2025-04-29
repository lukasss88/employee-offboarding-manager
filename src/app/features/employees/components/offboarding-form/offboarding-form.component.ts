import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OffboardingFormService } from './offboarding-form.service';
import { OffboardingFormData } from './offboarding-form.model';

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
  @Input() initialData?: Partial<OffboardingFormData>;
  @Output() formSubmit = new EventEmitter<OffboardingFormData>();
  @Output() formCancel = new EventEmitter<void>();

  private formService = inject(OffboardingFormService);
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formService.createForm(this.initialData);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value as OffboardingFormData);
    } else {
      this.formService.markFormGroupTouched(this.form);
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }
}
