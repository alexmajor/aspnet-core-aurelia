import { Activity } from './models/activity';
import { AppUser } from './models/app-user';
import { BootstrapFormRenderer } from './resources/bootstrap-form-renderer';
import { ValidationControllerFactory, ValidationController } from 'aurelia-validation';
import { inject, autoinject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { bindable } from 'aurelia-framework';
import { EmployeeService } from './services/employee-service';
import { Employee } from './models/employee';

@autoinject
@inject(ValidationControllerFactory)
export class RegisterViewModel {
  @bindable employee: Employee;
  employeeService: EmployeeService;
  router: Router;
  controller: ValidationController;

  constructor(employeeService: EmployeeService, router: Router, controllerFactory: ValidationControllerFactory) {
    this.employeeService = employeeService;
    this.router = router;
    this.employee = new Employee();

    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.controller.addObject(this.employee.identity, AppUser.rules);
    this.controller.addObject(this.employee.activity, Activity.rules);
  }

  register() {
    this.controller.validate().then(errors => {
      if (errors.valid) {
        this.employeeService.create(this.employee).then(() => {
          this.router.navigateToRoute('login');
        });
      }
    });
  }
}
