export type EmployeeId = string; 

export interface Equipment {
  id: string;
  name: string;
}

export interface Employee {
  id: EmployeeId;
  name: string;
  department: string;
  status: 'ACTIVE' | 'OFFBOARDED';
  email: string;
  equipments: Equipment[];
}
