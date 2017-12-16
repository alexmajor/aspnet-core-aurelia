import { Employee } from './../models/employee';
import { inject } from 'aurelia-dependency-injection';
import { Endpoint, Rest } from 'aurelia-api';
import { plainToClass, classToClass } from 'class-transformer';

@inject(Endpoint.of('api'))
export class EmployeeService {

  private endpoint: Rest;

  constructor(endpoint: Rest) {
    this.endpoint = endpoint;
  }

  create(employee: Employee): Promise<Employee> {
    return this.endpoint.post('employees/register', employee, this.jwt());
  }

  update(employee: Employee): Promise<Employee> {
    return this.endpoint.patch('employees', employee.id, employee, this.jwt());
  }

  getAll(): Promise<Employee[]> {
    return this.endpoint.find('employees').then(response => {
      return Promise.resolve(plainToClass<Employee, Object[]>(Employee, response));
    });
  }

  getById(id: number): Promise<Employee> {
    return this.endpoint.find('employees', id).then(response => {
      return Promise.resolve(plainToClass<Employee, Object>(Employee, response));
    });
  }

  // create authorization header with jwt token
  private jwt() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = { 'Authorization': 'Bearer ' + currentUser.token };
      return { headers: headers };
    }
  }
}
