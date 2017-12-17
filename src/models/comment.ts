import { EntityBase } from './entity-base';

export class Comment extends EntityBase {
  message: string;

  constructor(message: string) {
    super();
    
    this.message = message;
  }
}
