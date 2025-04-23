import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('[Interceptor] Error occurred:', error);
      let errorMessage = 'An error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Client Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = `Server Error: ${error.status} - Http failure response for ${error.url}: ${error.status} ${error.statusText}`;
      }

      // Return a new error with our formatted message
      return throwError(() => errorMessage);
    })
  );
};
