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
      { route: 'employees/:id?', moduleId: 'employee-list', name: 'employees', title:'Employees' }
    ]);
    this.router = router;
  }
}
