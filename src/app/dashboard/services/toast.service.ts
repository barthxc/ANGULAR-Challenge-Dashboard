import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  showToast(message: string, type: 'success' | 'error' | 'warning') {
    this.snackBar.open(message, 'X', {
      duration: 1500,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: [type],
    });
  }
}
