import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeDetailsComponent } from './employee-details.component';
import { mockEmployees } from '../../../../shared/testing/test-data/mock-employees';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('EmployeeDetailsComponent', () => {
  let component: EmployeeDetailsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EmployeeDetailsComponent,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
      ],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('employee', mockEmployees[0]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display employee details correctly', () => {
    const nameElement = fixture.debugElement.query(By.css('h1'));
    const departmentElement = fixture.debugElement.query(
      By.css('.detail-row:nth-child(2) .value')
    );
    const emailElement = fixture.debugElement.query(
      By.css('.detail-row:nth-child(3) .value')
    );

    expect(nameElement.nativeElement.textContent).toContain(
      mockEmployees[0].name
    );
    expect(departmentElement.nativeElement.textContent).toContain(
      mockEmployees[0].department
    );
    expect(emailElement.nativeElement.textContent).toContain(
      mockEmployees[0].email
    );
  });

  it('should have a back link to employees page', () => {
    const backLink = fixture.debugElement.query(By.css('.back-link'));
    expect(backLink.attributes['routerLink']).toBe('/employees');
  });

  describe('when offboard button is clicked', () => {
    it('should emit requestOffboarding event', () => {
      const requestOffboardingSpy = spyOn(component.requestOffboarding, 'emit');

      const offboardButton = fixture.debugElement.query(
        By.css('#offboard-button')
      );
      offboardButton.nativeElement.click();

      expect(requestOffboardingSpy).toHaveBeenCalled();
    });
  });
});
