import { AppUser } from './../models/app-user';
import { inject } from 'aurelia-dependency-injection';
import { Endpoint, Rest } from 'aurelia-api';
import { plainToClass, classToClass } from 'class-transformer';

@inject(Endpoint.of('api'))
export class AuthenticationService {
  private endpoint: Rest;

  constructor(endpoint: Rest) {
    this.endpoint = endpoint;
  }

  login(username: string, password: string) {
    return this.endpoint.post('employees/authenticate', { username: username, password: password }).then(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
    });

  }
}
