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

export interface EmployeeOffboardRequest {
  address: OffboardAddress;
  notes: string;
  phone: string;
  email: string;
}

export interface OffboardAddress {
  streetLine1: string;
  country: string;
  postalCode: string;
  receiver: string;
}

export interface EmployeeOffboardEvent {
  id: EmployeeId;
  request: EmployeeOffboardRequest;
}
