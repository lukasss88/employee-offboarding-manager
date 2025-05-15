import { computed, Injectable, signal } from '@angular/core';
import { Employee, EmployeeOffboardRequest } from '@shared/models';
import { EmployeeService } from './employee.service';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface EmployeeState {
  employees: Employee[];
  currentEmployee: Employee | null;
  isLoading: boolean;
  pendingEmployeeId: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeStateService {
  private state = signal<EmployeeState>({
    employees: [],
    currentEmployee: null,
    isLoading: false,
    pendingEmployeeId: null,
  });

  constructor(private employeeService: EmployeeService) {
    this.loadEmployees();
  }

  employees = computed(() => this.state().employees);
  currentEmployee = computed(() => this.state().currentEmployee);
  isLoading = computed(() => this.state().isLoading);
  pendingEmployeeId = computed(() => this.state().pendingEmployeeId);

  setCurrentEmployee(id: string) {
    if (this.state().isLoading) {
      this.state.update((state) => ({
        ...state,
        pendingEmployeeId: id,
      }));
      return;
    }

    const employee = this.state().employees.find(
      (employee) => employee.id === id
    );
    if (!employee) {
      throw new Error(`Employee with id ${id} not found`);
    }
    this.state.update((state) => ({
      ...state,
      currentEmployee: employee,
      pendingEmployeeId: null,
    }));
  }

  offBoardEmployee(id: string, request: EmployeeOffboardRequest) {
    this.setLoading(true);
    return this.employeeService.offBoardEmployee(id, request).pipe(
      tap((employee) =>
        this.state.update((state) => ({
          ...state,
          employees: state.employees.map((e) =>
            e.id === employee.id ? employee : e
          ),
          currentEmployee: employee,
          isLoading: false,
        }))
      )
    );
  }

  setLoading(isLoading: boolean) {
    this.state.update((state) => ({ ...state, isLoading }));
  }

  private loadEmployees() {
    this.setLoading(true);

    this.employeeService
      .getEmployees()
      .pipe(
        tap((employees) => {
          this.state.update((state) => ({
            ...state,
            employees: employees,
            isLoading: false,
          }));

          const pendingId = this.state().pendingEmployeeId;
          if (pendingId) {
            this.setCurrentEmployee(pendingId);
          }
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }
}
