import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { interceptorProvider } from './interceptor/interceptor.service';
import { SpinnerInterceptor, interceptorSpinner } from './interceptor/spinner.interceptor';





export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,
    withViewTransitions({

    })),
  provideHttpClient(
    withInterceptorsFromDi(),
  ),
  provideToastr(),
  provideAnimations(),
  importProvidersFrom(BrowserAnimationsModule),
  importProvidersFrom(HttpClientModule),
    interceptorProvider,
    interceptorSpinner
  ],

};

