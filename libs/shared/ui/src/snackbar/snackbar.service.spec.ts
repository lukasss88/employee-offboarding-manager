import { TestBed } from '@angular/core/testing';
import { SnackbarService } from './snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  SnackbarComponent,
  SnackbarData,
} from './snackbar.component';

describe('SnackbarService', () => {
  let service: SnackbarService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatSnackBar', ['openFromComponent']);

    TestBed.configureTestingModule({
      providers: [SnackbarService, { provide: MatSnackBar, useValue: spy }],
    });

    service = TestBed.inject(SnackbarService);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open snackbar with success type when showSuccess is called', () => {
    const message = 'Success message';
    const action = 'Close';
    const duration = 5000;

    const expectedData: SnackbarData = {
      message,
      action,
      type: 'success',
    };

    service.showSuccess(message, action, duration);

    expect(snackBarSpy.openFromComponent).toHaveBeenCalledWith(
      SnackbarComponent,
      {
        duration,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        data: expectedData,
      }
    );
  });

  it('should use default values when only message is provided', () => {
    const message = 'Success message';
    const action = 'Close';
    const duration = 50000;

    const expectedData: SnackbarData = {
      message,
      action,
      type: 'success',
    };

    service.showSuccess(message);

    expect(snackBarSpy.openFromComponent).toHaveBeenCalledWith(
      SnackbarComponent,
      {
        duration,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        data: expectedData,
      }
    );
  });
});
