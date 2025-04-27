import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerService } from '../../../core/services/spinner/spinner.service';

@Component({
  selector: 'app-global-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    @if (spinnerService.loading()) {
      <div class="spinner-overlay">
        <mat-spinner color="accent"></mat-spinner>
      </div>
    }
  `,
  styleUrls: ['./global-spinner.component.sass']
})
export class GlobalSpinnerComponent {
  spinnerService = inject(SpinnerService);
}