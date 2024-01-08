import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService,) { }

  showSuccessToast(msg: string) {
    this.toastr.success(`${msg}`, 'Success', {
      timeOut: 5000,
      easeTime: 1000,
      progressBar: true,
      positionClass: 'toast-top-center',
    });
  }

  showErrorToast(msg: string) {
    this.toastr.error(`${msg}`, 'Error', {
      timeOut: 5000,
      easeTime: 1000,
      progressBar: true,
      positionClass: 'toast-top-center',
    });
  }

}
