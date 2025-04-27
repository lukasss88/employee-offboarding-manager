import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { spinnerInterceptor } from './core/interceptors/spinner.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from './data/data.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpErrorInterceptor, spinnerInterceptor])),
    importProvidersFrom([
      HttpClientInMemoryWebApiModule.forRoot(DataService, {
        dataEncapsulation: false,
        passThruUnknownUrl: true  // optional: let real HTTP calls pass through
      })
    ]),
    provideAnimations(),
  ],
};
