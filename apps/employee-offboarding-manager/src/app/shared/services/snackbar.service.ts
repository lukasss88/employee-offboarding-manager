import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  SnackbarComponent,
  SnackbarData,
} from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackBar = inject(MatSnackBar);

  showSuccess(
    message: string,
    action: string = 'Close',
    duration: number = 50000
  ): void {
    this.showSnackbar(
      {
        message,
        action,
        type: 'success',
      },
      duration
    );
  }

  private showSnackbar(data: SnackbarData, duration: number): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      data,
    });
  }
}
