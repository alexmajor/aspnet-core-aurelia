import { autoinject } from 'aurelia-framework';
import { AuthenticationService } from './services/authentication-service';
import { Router } from 'aurelia-router';

@autoinject
export class LoginViewModel {
  router: Router;
  authenticationService: AuthenticationService;
  userName: string;
  password: string;

  constructor(router: Router, authenticationService: AuthenticationService) {
    this.router = router;
    this.authenticationService = authenticationService;
  }

  login() {
    this.authenticationService.login(this.userName, this.password).then(() => {
      this.router.navigateToRoute('employees');
    });
  }
}
