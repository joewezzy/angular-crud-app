import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CmpAddEditComponent } from './cmp-add-edit/cmp-add-edit.component';
import { EmployeeService } from './service/employee.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';
import { EmpDeleteComponent } from './emp-delete/emp-delete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  openAddEmpForm() {
    const dialogRef = this._dialog.open(CmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        res && this.getEmployees();
      }
    })
  }

  getEmployees() {
    this._empService.getEmployee().subscribe({
      next: (res) => {
        const dataArray = Object.values(res);
        this.dataSource = new MatTableDataSource(dataArray);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.error,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event?.target as HTMLInputElement)?.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditEmpForm(data: any) {
    const dialogRef = this._dialog.open(CmpAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        res && this.getEmployees();
      }
    })
  }

  deleteEmployee(data: number) {
    const dialogRef = this._dialog.open(EmpDeleteComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        res && this.getEmployees();
      }
    })
  }
}
