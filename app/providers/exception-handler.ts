import { Injectable, ExceptionHandler } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';

@Injectable()
export class CustomExceptionHandler {
  constructor(
    private alert: AlertController,
    private toast: ToastController
  ) {}
  call(error, stackTrace = null, reason = null) {
    this.alert.create({
      title: 'Error',
      subTitle: error.message,
      buttons: ['OK']
    }).present().catch(console.error);
  }
}
