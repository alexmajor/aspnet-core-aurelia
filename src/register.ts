import { autoinject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { bindable } from 'aurelia-framework';
import { EmployeeService } from './services/employee-service';
import { Employee } from './models/employee';

@autoinject
export class RegisterViewModel {
  @bindable employee: Employee;
  employeeService: EmployeeService;
  router: Router;

  constructor(employeeService: EmployeeService, router: Router) {
    this.employeeService = employeeService;
    this.router = router;
    this.employee = new Employee();
  }

  register() {
    this.employeeService.create(this.employee).then(() => {
      this.router.navigateToRoute('login');
    });
  }
}
