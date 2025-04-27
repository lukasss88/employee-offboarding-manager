import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackbarComponent, SnackbarData } from './snackbar.component';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;
  let snackBarRefSpy: jasmine.SpyObj<MatSnackBarRef<SnackbarComponent>>;
  
  beforeEach(async () => {
    snackBarRefSpy = jasmine.createSpyObj('MatSnackBarRef', ['dismiss']);
    
    const mockData: SnackbarData = {
      message: 'Test message',
      action: 'Close',
      type: 'success'
    };

    await TestBed.configureTestingModule({
      imports: [SnackbarComponent],
      providers: [
        { provide: MatSnackBarRef, useValue: snackBarRefSpy },
        { provide: MAT_SNACK_BAR_DATA, useValue: mockData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the message from the data', () => {
    const messageElement = fixture.debugElement.query(By.css('.snackbar-container span'));
    expect(messageElement.nativeElement.textContent).toBe('Test message');
  });

  it('should display the action button with correct text', () => {
    const buttonElement = fixture.debugElement.query(By.css('.close-button'));
    expect(buttonElement.nativeElement.textContent.trim()).toBe('Close');
  });

  it('should dismiss the snackbar when the action button is clicked', () => {
    const buttonElement = fixture.debugElement.query(By.css('.close-button'));
    buttonElement.triggerEventHandler('click', null);
    
    expect(snackBarRefSpy.dismiss).toHaveBeenCalled();
  });

  it('should apply success class when type is success', () => {
    expect(component.getTypeClass()).toBe('success');
    const containerElement = fixture.debugElement.query(By.css('.snackbar-container'));
    expect(containerElement.classes['success']).toBeTrue();
  });

  it('should apply correct class based on type value', () => {
    const testTypes: ('success' | 'error' | 'info' | 'warning')[] = ['error', 'info', 'warning'];
    
    for (const type of testTypes) {
      component.data.type = type;
      fixture.detectChanges();
      
      expect(component.getTypeClass()).toBe(type);
    }
  });
});