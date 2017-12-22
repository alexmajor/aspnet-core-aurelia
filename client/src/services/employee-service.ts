import { AppUser } from './../models/app-user';
import { autoinject } from 'aurelia-framework';
import { AuthenticationService } from './authentication-service';
import { Employee } from './../models/employee';
import { inject } from 'aurelia-dependency-injection';
import { Endpoint, Rest } from 'aurelia-api';
import { plainToClass, classToClass } from 'class-transformer';

@inject(Endpoint.of('api'), AuthenticationService)
export class EmployeeService {

  private endpoint: Rest;
  private authenticationService: AuthenticationService;

  constructor(endpoint: Rest, authenticationService: AuthenticationService) {
    this.endpoint = endpoint;
    this.authenticationService = authenticationService;
  }

  create(employee: Employee): Promise<Employee> {
    return this.endpoint.post('employees/register', employee);
  }

  update(employee: Employee): Promise<Employee> {
    this.endpoint.client.defaults.headers = this.authenticationService.jwt();
    return this.endpoint.patch('employees', employee.id, employee).then(response =>{
      return Promise.resolve(plainToClass<Employee, Object>(Employee, response));
    });
  }

  getAll(): Promise<Employee[]> {
    this.endpoint.client.defaults.headers = this.authenticationService.jwt();
    return this.endpoint.find('employees').then(response => {
      return Promise.resolve(plainToClass<Employee, Object[]>(Employee, response));
    });
  }

  getById(id: number): Promise<Employee> {
    this.endpoint.client.defaults.headers = this.authenticationService.jwt();
    return this.endpoint.find('employees', id).then(response => {
      return Promise.resolve(plainToClass<Employee, Object>(Employee, response));
    });
  }

  currentUser(): AppUser {
    let currentUser = this.authenticationService.currentUser();
    return plainToClass<AppUser, Object>(AppUser, currentUser);
  }

}
