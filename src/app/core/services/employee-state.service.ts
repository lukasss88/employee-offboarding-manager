import { computed, Injectable, signal } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from './employee.service';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface EmployeeState {
  employees: Employee[];
  currentEmployee: Employee | null;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeStateService {
  private state = signal<EmployeeState>({
    employees: [],
    currentEmployee: null,
  });

  constructor(private employeeService: EmployeeService) {
    this.loadEmployees();
  }

  employees = computed(() => this.state().employees);
  currentEmployee = computed(() => this.state().currentEmployee);

  setCurrentEmployee(id: string) {
    const employee = this.state().employees.find((employee) => employee.id === id);
    if (!employee) {
      throw new Error(`Employee with id ${id} not found`);
    }
    this.state.update((state) => ({
      ...state,
      currentEmployee: employee,
    }));
  }

  private loadEmployees() {
    this.employeeService
      .getEmployees()
      .pipe(
        tap((employees) => {
          this.state.update(state => ({
            ...state,
            employees: employees,
          }));
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }
}
