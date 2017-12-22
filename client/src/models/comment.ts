import { ValidationRules } from 'aurelia-validation';
import { EntityBase } from './entity-base';

export class Comment extends EntityBase {
  message: string;

  static rules = ValidationRules
    .ensure((c: Comment) => c.message).displayName('Comment').required().maxLength(240).withMessage('\${$displayName} cannot exceed \${$config.length} characters')
    .rules;
}
