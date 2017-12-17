import { RouterConfiguration, Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';

@autoinject
export class App {

  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Activity Sign Up';
    config.map([
      { route: ['', 'login'], name: 'login', moduleId: 'login', nav: true, title: 'Login' },
      { route: 'register', name: 'register', moduleId: 'register', nav: true, title: 'Register' },
      { route: 'employees', name: 'employees', moduleId: 'employee-list', title: 'Employee' }
    ]);
    this.router = router;
  }
}
