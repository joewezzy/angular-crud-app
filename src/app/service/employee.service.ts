import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }
  
  getEmployee(): Observable<any> {
    return this._http.get('http://localhost:3000/employee');
  }
  
  addEmployee(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/employee', data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.patch(`http://localhost:3000/employee/${id}`, data);
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/employee/${id}`);
  }
}
