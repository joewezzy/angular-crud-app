import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-cmp-add-edit',
  templateUrl: './cmp-add-edit.component.html',
  styleUrls: ['./cmp-add-edit.component.css'],
})
export class CmpAddEditComponent implements OnInit {
  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Post Graduate',
    'Graduate',
    'Masters',
  ];

  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<CmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.empForm.valid) {
      const serviceData = this.data ? this._empService.updateEmployee(this.data.id, this.empForm.value) : this._empService.addEmployee(this.empForm.value);
      serviceData.subscribe({
        next: (res) => {
          this._coreService.openSnackBar(`Employee ${this.data ? 'data updated' : 'added'} successfully! `);
          this._dialogRef.close(true);
        },
        error: console.error,
      });
    }
  }
}
