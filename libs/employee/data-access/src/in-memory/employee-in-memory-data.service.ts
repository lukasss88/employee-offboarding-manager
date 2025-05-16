import { Injectable } from '@angular/core';
import {
  InMemoryDbService,
  RequestInfo,
} from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataService implements InMemoryDbService {
  createDb() {
    return {
      employees: [
        {
          id: '1',
          name: 'John Doe',
          department: 'Engineering',
          status: 'ACTIVE',
          email: 'john.doe@example.com',
          equipments: [
            { id: 'eq001', name: 'MacBook Air' },
            { id: 'eq002', name: 'Magic Mouse' },
          ],
        },
        {
          id: '2',
          name: 'Jane Smith',
          department: 'Human Resources',
          status: 'ACTIVE',
          email: 'jane.smith@example.com',
          equipments: [
            { id: 'eq003', name: 'MacBook Air' },
            { id: 'eq004', name: 'Magic Mouse' },
          ],
        },
        {
          id: '3',
          name: 'Michael Brown',
          department: 'Sales',
          status: 'OFFBOARDED',
          email: 'michael.brown@example.com',
          equipments: [
            { id: 'eq005', name: 'Dell XPS 13' },
            { id: 'eq006', name: 'Logitech MX Master' },
          ],
        },
        {
          id: '4',
          name: 'Emily Johnson',
          department: 'Marketing',
          status: 'ACTIVE',
          email: 'emily.johnson@example.com',
          equipments: [
            { id: 'eq007', name: 'MacBook Pro' },
            { id: 'eq008', name: 'Magic Keyboard' },
          ],
        },
        {
          id: '5',
          name: 'David Lee',
          department: 'Finance',
          status: 'ACTIVE',
          email: 'david.lee@example.com',
          equipments: [
            { id: 'eq009', name: 'MacBook Air' },
            { id: 'eq010', name: 'Magic Mouse' },
          ],
        },
        {
          id: '6',
          name: 'Sarah Walker',
          department: 'IT',
          status: 'OFFBOARDED',
          email: 'sarah.walker@example.com',
          equipments: [
            { id: 'eq011', name: 'ThinkPad T14' },
            { id: 'eq012', name: 'Lenovo Wireless Mouse' },
          ],
        },
        {
          id: '7',
          name: 'Robert Davis',
          department: 'Operations',
          status: 'ACTIVE',
          email: 'robert.davis@example.com',
          equipments: [
            { id: 'eq013', name: 'MacBook Air' },
            { id: 'eq014', name: 'Magic Mouse' },
          ],
        },
        {
          id: '8',
          name: 'Laura Martinez',
          department: 'Design',
          status: 'ACTIVE',
          email: 'laura.martinez@example.com',
          equipments: [
            { id: 'eq015', name: 'MacBook Pro' },
            { id: 'eq016', name: 'Apple Pencil' },
          ],
        },
        {
          id: '9',
          name: 'Daniel Wilson',
          department: 'Product',
          status: 'OFFBOARDED',
          email: 'daniel.wilson@example.com',
          equipments: [
            { id: 'eq017', name: 'Dell Latitude' },
            { id: 'eq018', name: 'Logitech MX Anywhere' },
          ],
        },
        {
          id: '10',
          name: 'Olivia Taylor',
          department: 'Customer Support',
          status: 'ACTIVE',
          email: 'olivia.taylor@example.com',
          equipments: [
            { id: 'eq019', name: 'MacBook Air' },
            { id: 'eq020', name: 'Magic Mouse' },
          ],
        },
      ],
    };
  }

  post(reqInfo: RequestInfo): Observable<any> | undefined {
    // Check if this is an offboard request for an employee
    const isOffboardEndpoint = reqInfo.url.endsWith('/offboard');

    if (isOffboardEndpoint && reqInfo.method === 'post') {
      // Extract the employee ID from the URL
      // URL format will be 'api/employees/{id}/offboard'
      const urlParts = reqInfo.url.split('/');
      const employeeId = urlParts[urlParts.length - 2];

      const body = reqInfo.utils.getJsonBody(reqInfo.req) as any;

      // Find & update the employee in the collection
      const employees = reqInfo.collection as any[];
      const employee = employees.find((e) => e.id === employeeId);

      if (employee) {
        // Update employee status and save offboard info
        employee.status = 'OFFBOARDED';
        employee.offboardInfo = body;

        // Return the updated employee as the response
        return reqInfo.utils.createResponse$(() => ({
          status: 200,
          body: employee,
        }));
      }
    }

    // If not an offboard request or employee not found, let default POST handler run
    return undefined;
  }
}
