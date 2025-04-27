import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalSpinnerComponent } from './global-spinner.component';
import { SpinnerService } from '../../../core/services/spinner/spinner.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Signal, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('GlobalSpinnerComponent', () => {
  let component: GlobalSpinnerComponent;
  let fixture: ComponentFixture<GlobalSpinnerComponent>;
  let mockSpinnerService: jasmine.SpyObj<SpinnerService>;
  let mockLoadingSignal: Signal<boolean>;
  
  beforeEach(async () => {
    const loadingSource = signal(false);
    mockLoadingSignal = loadingSource.asReadonly();
    mockSpinnerService = jasmine.createSpyObj('SpinnerService', [], {
      loading: mockLoadingSignal
    });
    (mockSpinnerService as any).setLoading = (value: boolean) => {
      loadingSource.set(value);
    };
    
    await TestBed.configureTestingModule({
      imports: [
        GlobalSpinnerComponent, 
        MatProgressSpinnerModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: SpinnerService, useValue: mockSpinnerService }
      ]
    }).compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display spinner when loading is false', () => {
    const spinnerElement = fixture.nativeElement.querySelector('.spinner-overlay');
    expect(spinnerElement).toBeNull();
  });

  it('should display spinner when loading is true', () => {
    (mockSpinnerService as any).setLoading(true);
    
    fixture.detectChanges();
    
    const spinnerElement = fixture.nativeElement.querySelector('.spinner-overlay');
    expect(spinnerElement).toBeTruthy();
    
    const matSpinner = fixture.nativeElement.querySelector('mat-spinner');
    expect(matSpinner).toBeTruthy();
  });
});