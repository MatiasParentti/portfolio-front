import { HTTP_INTERCEPTORS, type HttpEvent, type HttpHandler, type HttpInterceptor, type HttpInterceptorFn, type HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private spinServ: SpinnerService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinServ.show();
    return next.handle(req).pipe(
      finalize(() => this.spinServ.hide())
    )

  }
}

export const interceptorSpinner = [{provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true}];

