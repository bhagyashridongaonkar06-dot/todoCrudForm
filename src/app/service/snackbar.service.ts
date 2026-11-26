import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackbar : MatSnackBar) { }

  successMSg(msg : string){
    this._snackbar.open(msg, 'close', {
      duration : 3000,
      verticalPosition : 'top',
      horizontalPosition : 'left'
    })
  }

  errorMSg(msg : string){
    this._snackbar.open(msg, 'close', {
      duration : 3000,
      verticalPosition : 'top',
      horizontalPosition : 'left',
      panelClass : ['error-snackbar']
    })
  }


}
