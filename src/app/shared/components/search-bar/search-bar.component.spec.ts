import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchBarComponent,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should bind input value to the term signal', () => {
    const inputElement = queryInputElement();

    inputElement.value = 'test search';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.term()).toBe('test search');
  });

  it('should emit termChange event when input value changes', () => {
    const termChangeSpy = spyOn(component.termChange, 'emit');
    const inputElement = queryInputElement();

    inputElement.value = 'new search term';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(termChangeSpy).toHaveBeenCalledWith('new search term');
  });

  function queryInputElement() {
    return fixture.debugElement.query(By.css('input.search-input'))
      .nativeElement;
  }
});
