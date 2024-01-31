import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  api = "https://angular-crud-app-9c0c9-default-rtdb.firebaseio.com/employees.json"

  constructor(private _http: HttpClient) { }
  
  getEmployee(): Observable<any> {
    return this._http.get(this.api);
  }
  
  addEmployee(data: any): Observable<any> {
    return this._http.post(this.api, data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.patch(`${this.api}/${id}`, data);
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`${this.api}/${id}`);
  }
}
