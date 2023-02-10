import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  constructor(private _snackBar: MatSnackBar) {}
 
  openSnackBar(msg: string, action: string = 'Ok') {
    this._snackBar.open(msg, action, {
      duration: 2500, 
      verticalPosition: 'top',
    });
  }
}