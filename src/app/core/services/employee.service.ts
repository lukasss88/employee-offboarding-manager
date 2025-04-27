import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../tokens/api.token';
import { Employee } from '../models/employee';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private httpClient = inject(HttpClient);
  private apiUrl = inject(API_URL);

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.apiUrl);
  }
}
