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
  newComment: string;

  constructor(employeeService: EmployeeService, router: Router) {
    this.employeeService = employeeService;
    this.routeConfig = router.routes.find((r) => { return r.name === 'employees' });
  }

  created() {
    this.employeeService.getAll().then(results => { this.employees = results });
  }

  select(id: number) {
    this.selectedId = id;
    this.newComment = '';
    return this.employeeService.getById(id).then(employee => {
      this.selectedEmployee = employee;
      this.routeConfig.navModel.setTitle(employee.identity.firstName);
    });
  }

  commentDetails(comment: Comment) {
    var creator: Employee = this.employees.find(e => e.identity.id == comment.createBy);
    return creator.identity.firstName + ' ' + creator.identity.lastName + ' ' + comment.modifyDate.toString();
  }

  addComment() {
    this.selectedEmployee.comments.push(new Comment(this.newComment));
    this.employeeService.update(this.selectedEmployee).then(() => {
      this.newComment = '';
    });
  }
}
