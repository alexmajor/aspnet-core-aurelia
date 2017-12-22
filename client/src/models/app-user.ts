import { ValidationRules } from 'aurelia-validation';
import { Exclude } from 'class-transformer';

export class AppUser {

  id: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;

  @Exclude()
  confirmPassword: string;

  static rules = ValidationRules
    .ensure((u: AppUser) => u.userName).displayName('User Name').required()
    .ensure((u: AppUser) => u.firstName).displayName('First Name').required()
    .ensure((u: AppUser) => u.lastName).displayName('Last Name').required()
    .ensure((u: AppUser) => u.email).displayName('Email').required().email()
    .ensure((u: AppUser) => u.password).displayName('Password').required()
    .ensure((u: AppUser) => u.confirmPassword).displayName('Confirm Password').required().satisfies((u, obj: AppUser) => u === obj.password).withMessage('Password must match')
    .rules;
  
}
