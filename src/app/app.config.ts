import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { interceptorProvider } from './interceptor/interceptor.service';




export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,
    withViewTransitions({

    })),
  provideHttpClient(
   withInterceptorsFromDi()
  ),
  provideToastr(),
  provideAnimations(),
  importProvidersFrom(BrowserAnimationsModule),
  importProvidersFrom(HttpClientModule),
  interceptorProvider
   
  ],

};

