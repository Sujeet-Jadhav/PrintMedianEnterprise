import { ErrorHandler, Injectable } from '@angular/core';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root',
})
export class CustomErrorHandler implements ErrorHandler {
  constructor(private readonly toaster: ToasterService) { }


  handleError(error: any): void {
    console.error('Unhandled Angular error:', error);

    // Show generic error only once for app crashes
    this.toaster.error(
      'Something went wrong in the application. Please try again or contact support.',
      'Application Error'
    );
  }

}
