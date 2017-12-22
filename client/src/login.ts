import { autoinject } from 'aurelia-framework';
import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { ValidationController, ValidationRules, ValidationControllerFactory } from 'aurelia-validation';
import { BootstrapFormRenderer } from './resources/bootstrap-form-renderer';
import { AuthenticationService } from './services/authentication-service';

@autoinject
@inject(ValidationControllerFactory)
export class LoginViewModel {
  router: Router;
  authenticationService: AuthenticationService;
  controller: ValidationController;
  userName: string;
  password: string;

  constructor(router: Router, authenticationService: AuthenticationService, controllerFactory: ValidationControllerFactory) {
    this.router = router;
    this.authenticationService = authenticationService;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
  }

  login() {
    this.controller.validate().then(errors => {
      if (errors.valid) {
        this.authenticationService.login(this.userName, this.password).then(() => {
          this.router.navigateToRoute('employees');
        });
      }
    });
  }
}

ValidationRules
  .ensure((vm: LoginViewModel) => vm.userName).displayName('User Name').required()
  .ensure((vm: LoginViewModel) => vm.password).displayName('Password').required()
  .on(LoginViewModel);