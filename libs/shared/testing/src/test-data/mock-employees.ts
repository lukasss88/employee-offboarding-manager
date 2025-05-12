import { Employee } from '@shared/models';

export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    department: 'IT',
    status: 'ACTIVE',
    email: 'john.doe@company.com',
    equipments: [{ id: 'eq1', name: 'Laptop' }],
  },
  {
    id: '2',
    name: 'Jane Smith',
    department: 'HR',
    status: 'ACTIVE',
    email: 'jane.smith@company.com',
    equipments: [{ id: 'eq2', name: 'Phone' }],
  },
];
