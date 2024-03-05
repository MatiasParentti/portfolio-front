import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS, withInterceptors, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { interceptorProvider } from './interceptor/interceptor.service';
import { interceptorSpinner } from './interceptor/spinner.interceptor';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ErrorResponseInterceptor } from './interceptor/error-response.interceptor';





export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding(),
    withViewTransitions()),
  provideHttpClient(
    withInterceptorsFromDi(), withFetch(), withInterceptors([ErrorResponseInterceptor])
  ),
  provideToastr(),
  provideAnimations(),
  importProvidersFrom(ModalModule.forRoot()),
  importProvidersFrom(BrowserAnimationsModule),
  importProvidersFrom(HttpClientModule),
    interceptorProvider,
    interceptorSpinner
  ],

};

