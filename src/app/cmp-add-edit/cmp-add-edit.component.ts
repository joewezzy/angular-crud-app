import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../model/employee.model';
import { v4 as uuidv4 } from 'uuid';

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
      let employees: Employee[] = [];

      const empData = localStorage.getItem('employees') ? JSON.parse(localStorage.getItem('employees')) : [];
      employees = empData;

      if (this.data){
        const listOfEmployees = employees.filter(emp => emp.id !== this.data.id);
        let employee = employees.filter(emp => emp.id === this.data.id)[0];
        const formObject = { ...this.empForm.value, id: employee.id}

        listOfEmployees.push(formObject);
        localStorage.setItem('employees', JSON.stringify(listOfEmployees));
      } else {
        const formObject = { ...this.empForm.value, id: uuidv4()}
        console.log(formObject);
        
        employees.push(formObject)
        
        localStorage.setItem('employees', JSON.stringify(employees));
      }

      this._coreService.openSnackBar(`Employee ${this.data ? 'data updated' : 'added'} successfully! `);
      this._dialogRef.close(true);

      // const serviceData = this.data ? this._empService.updateEmployee(this.data.id, this.empForm.value) : this._empService.addEmployee(formObject);
      // serviceData.subscribe({
      //   next: (res) => {
      //   },
      //   error: console.error,
      // });
    }
  }
}
