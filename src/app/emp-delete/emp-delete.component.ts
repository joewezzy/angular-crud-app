import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-emp-delete',
  templateUrl: './emp-delete.component.html',
  styleUrls: ['./emp-delete.component.css'],
})
export class EmpDeleteComponent {
  constructor(
    private _empService: EmployeeService,
    private _coreService: CoreService,
    private _dialog: MatDialogRef<EmpDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) {}

  deleteEmpProfile() {
    this._empService.deleteEmployee(this._data).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted!');
        this._dialog.close(true);
      },
      error: console.error,
    });
  }
}
