import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpErrorInterceptor } from '@shared/utils/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from '@employee/data-access';
import { spinnerInterceptor } from '@shared/utils/spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([httpErrorInterceptor, spinnerInterceptor])
    ),
    importProvidersFrom([
      HttpClientInMemoryWebApiModule.forRoot(DataService, {
        dataEncapsulation: false,
        passThruUnknownUrl: true,
      }),
    ]),
    provideAnimations(),
  ],
};
