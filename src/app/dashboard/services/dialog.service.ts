import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog, private toastService: ToastService) {}

  openDialog(
    title: string,
    message: string,
    confirmText: string = 'Aceptar',
    cancelText: string = 'Cancelar',
    action?: () => void, // 👈 Recibimos una función opcional
    toastMessage: string = 'Se ha realizado la acción',
    toastType: 'success' | 'error' | 'warning' = 'success'
  ) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title, message, confirmText, cancelText },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed && action) {
        action();
      }

      if (toastMessage) {
        this.toastService.showToast(toastMessage, toastType);
      }
    });
  }
}
