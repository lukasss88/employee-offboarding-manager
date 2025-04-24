import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  {
    path: 'employees',
    loadComponent: () =>
      import(
        './features/employees/pages/employees-page/employees-page.component'
      ).then((m) => m.EmployeesPageComponent),
  },
  { path: '**', redirectTo: 'employees' },
];
