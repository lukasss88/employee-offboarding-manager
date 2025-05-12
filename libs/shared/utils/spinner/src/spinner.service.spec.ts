import { TestBed } from '@angular/core/testing';
import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially have loading set to false', () => {
    expect(service.loading()).toBe(false);
  });

  it('should set loading to true when show is called', () => {
    service.show();
    expect(service.loading()).toBe(true);
  });

  it('should set loading to false when hide is called and request count is 0', () => {
    service.show();
    service.hide();
    expect(service.loading()).toBe(false);
  });

  it('should keep loading true when hide is called but there are still pending requests', () => {
    service.show();
    service.show();
    service.hide();
    expect(service.loading()).toBe(true);
  });

  it('should set loading to false only when all requests are complete', () => {
    service.show();
    service.show();
    service.show();
    service.hide();
    service.hide();
    expect(service.loading()).toBe(true);
    service.hide();
    expect(service.loading()).toBe(false);
  });

  it('should handle extra hide calls and keep loading false', () => {
    service.show();
    service.hide();
    service.hide();
    expect(service.loading()).toBe(false);
  });
});
