import { ValidationControllerFactory, ValidationController } from 'aurelia-validation';
import { BootstrapFormRenderer } from './resources/bootstrap-form-renderer';
import { Router, RouteConfig } from 'aurelia-router';
import { Comment } from './models/comment';
import { Employee } from './models/employee';
import { autoinject } from 'aurelia-framework';
import { EmployeeService } from './services/employee-service';

@autoinject
export class EmployeeListViewModel {
  routeConfig: RouteConfig;
  employeeService: EmployeeService;
  employees: Employee[];
  selectedEmployee: Employee;
  selectedId: number;
  newComment: Comment;
  controller: ValidationController;

  constructor(employeeService: EmployeeService, router: Router, controllerFactory: ValidationControllerFactory) {
    this.employeeService = employeeService;
    this.routeConfig = router.routes.find((r) => { return r.name === 'employees' });
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
  }

  created() {
    this.employeeService.getAll().then(results => {
      this.employees = results;
      this.selectedEmployee = this.employees.find((e) => { return e.identity.id === this.employeeService.currentUser().id });
      this.select(this.selectedEmployee.id);
    });
  }

  select(id: number) {
    this.selectedId = id;
    return this.employeeService.getById(id).then(employee => {
      this.selectedEmployee = employee;
      this.routeConfig.navModel.setTitle(employee.identity.firstName);
      this.controller.removeObject(this.newComment);
      this.newComment = new Comment();
      this.controller.addObject(this.newComment, Comment.rules);
    });
  }

  commentDetails(comment: Comment) {
    let creator: Employee = this.employees.find(e => e.identity.id == comment.createBy);
    if (creator && creator.identity) {
      return creator.identity.firstName + ' ' + creator.identity.lastName + ' ' + comment.modifyDate.toString();
    }
    return '';
  }

  addComment() {
    this.controller.validate().then(errors => {
      if (errors.valid) {
        this.selectedEmployee.comments.push(this.newComment);
        this.employeeService.update(this.selectedEmployee).then((employeeResult) => {
          this.selectedEmployee = employeeResult;
          this.controller.removeObject(this.newComment);
          this.newComment = new Comment();
          this.controller.addObject(this.newComment, Comment.rules);
        });
      }
    });
  }
}
