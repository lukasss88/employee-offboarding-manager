import { Component, Inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

export interface SnackbarData {
  message: string;
  action: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="snackbar-container" [ngClass]="getTypeClass()">
      <span>{{ data.message }}</span>
      <button class="close-button" (click)="snackBarRef.dismiss()">
        {{ data.action }}
      </button>
    </div>
  `,
  styleUrl: './snackbar.component.sass',
})
export class SnackbarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData
  ) {}

  getTypeClass(): string {
    return this.data.type || 'success';
  }
}
