import { Injectable, ExceptionHandler } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class CustomExceptionHandler {
  constructor(private toast: ToastController) {}
  call(error, stackTrace = null, reason = null) {
    this.toast.create({
      message: 'ERROR: ' + error.message,
      showCloseButton: true,
      duration: 5000
    }).present();
  }
}
