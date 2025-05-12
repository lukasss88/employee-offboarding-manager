import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '@shared/models';

@Pipe({
  name: 'employeeFilter',
  standalone: true,
  pure: true,
})
export class EmployeeFilterPipe implements PipeTransform {
  transform(employees: Employee[], searchTerm: string): Employee[] {
    if (!employees || !searchTerm) {
      return employees;
    }

    const lowercaseTerm = searchTerm.toLowerCase().trim();

    if (!lowercaseTerm) {
      return employees;
    }

    return employees.filter((employee) => {
      return (
        employee.name.toLowerCase().includes(lowercaseTerm) ||
        employee.email.toLowerCase().includes(lowercaseTerm) ||
        employee.department.toLowerCase().includes(lowercaseTerm) ||
        employee.status.toLowerCase().includes(lowercaseTerm) ||
        (employee.equipments &&
          employee.equipments.some((equipment) =>
            equipment.name.toLowerCase().includes(lowercaseTerm)
          ))
      );
    });
  }
}
