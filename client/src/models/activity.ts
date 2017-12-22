import { EntityBase } from './entity-base';
import { ValidationRules } from 'aurelia-validation';

export class Activity extends EntityBase {
  name: string;

  static rules = ValidationRules
    .ensure((a: Activity) => a.name).displayName('Activity Name').required()
    .rules;
}
