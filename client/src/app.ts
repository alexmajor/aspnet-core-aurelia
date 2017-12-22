import { RouterConfiguration, Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
import { AuthorizeStep } from './resources/authorize-step';

@autoinject
export class App {

  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Activity Sign Up';
    config.addAuthorizeStep(AuthorizeStep);
    config.map([
      { route: ['', 'login'], name: 'login', moduleId: 'login', nav: true, title: 'Login' },
      { route: 'register', name: 'register', moduleId: 'register', nav: true, title: 'Register' },
      { route: 'employees', name: 'employees', moduleId: 'employee-list', title: 'Employee', settings: { auth: true } }
    ]);
    this.router = router;
  }
}
