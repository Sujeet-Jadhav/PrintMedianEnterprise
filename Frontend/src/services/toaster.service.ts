import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {

  private horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar) { }

  error(message: string, subject?: string) {
    this._snackBar.open(message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 10000,
      panelClass: ['red-snackbar'],
    });
  }

  toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    timer: 3000,
    timerProgressBar: true
  })



  success(message?: string) {
    this._snackBar.open(message || "Process successfully completed", 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 10000,
      panelClass: ['green-snackbar'],
    });
  }

  info(message: string) {
    this._snackBar.open(message, 'Info', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
      panelClass: ['info-snackbar'],
    });
  }

  showSuccess(message?: string) {
    Swal.fire('Success!', message, 'success');
  }

  showError(message?: string) {
    Swal.fire('Error!', message, 'error');
  }
  showInfo(message?: string) {
    Swal.fire('Info!', message, 'info');
  }

  showWarning(message?: string) {
    Swal.fire('Warning!', message, 'warning');
  }

  warning(message: string) {
    this._snackBar.open(message, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 10000,
      panelClass: ['warning-snackbar'],
    });
  }


}
