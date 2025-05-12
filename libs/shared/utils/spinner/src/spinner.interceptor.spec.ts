import { TestBed } from '@angular/core/testing';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { spinnerInterceptor } from './spinner.interceptor';
import { SpinnerService } from './spinner.service';
import { Injector, runInInjectionContext } from '@angular/core';

describe('spinnerInterceptor', () => {
  let interceptor: HttpInterceptorFn;
  let spinnerService: jasmine.SpyObj<SpinnerService>;
  let injector: Injector;

  beforeEach(() => {
    spinnerService = jasmine.createSpyObj('SpinnerService', ['show', 'hide']);

    TestBed.configureTestingModule({
      providers: [{ provide: SpinnerService, useValue: spinnerService }],
    });

    injector = TestBed.inject(Injector);
    interceptor = spinnerInterceptor;
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should call show method when request starts', () => {
    const req = new HttpRequest('GET', '/test');
    const nextHandlerSpy = jasmine
      .createSpy()
      .and.returnValue(of(new HttpResponse()));

    runInInjectionContext(injector, () => {
      interceptor(req, nextHandlerSpy);
    });

    expect(spinnerService.show).toHaveBeenCalled();
  });

  it('should call hide method when request completes', () => {
    const req = new HttpRequest('GET', '/test');
    const httpEvent = new HttpResponse({ body: {}, status: 200 });

    runInInjectionContext(injector, () => {
      let completed = false;

      interceptor(req, () => of(httpEvent)).subscribe({
        next: () => {},
        complete: () => {
          completed = true;
        },
      });

      expect(spinnerService.show).toHaveBeenCalled();
      expect(completed).toBeTrue();
      expect(spinnerService.hide).toHaveBeenCalled();
    });
  });

  it('should call hide method even when request fails', () => {
    const req = new HttpRequest('GET', '/test');
    const error = new Error('Test error');

    runInInjectionContext(injector, () => {
      let hasErrored = false;

      interceptor(req, () => {
        return new Observable<HttpEvent<unknown>>((observer) => {
          observer.error(error);
        });
      }).subscribe({
        next: () => {},
        error: () => {
          hasErrored = true;
        },
        complete: () => {},
      });

      expect(spinnerService.show).toHaveBeenCalled();
      expect(hasErrored).toBeTrue();
      expect(spinnerService.hide).toHaveBeenCalled();
    });
  });
});
