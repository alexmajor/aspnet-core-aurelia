import { Type } from 'class-transformer';
import { Activity } from './activity';
import { AppUser } from './app-user';
import { Comment } from './comment';
import { EntityBase } from './entity-base';

export class Employee extends EntityBase {
  activityId: number;
  @Type(() => AppUser)
  identity: AppUser;
  @Type(() => Activity)
  activity: Activity;
  @Type(() => Comment)
  comments: Comment[];

  constructor() {
    super();
    this.identity = new AppUser();
    this.activity = new Activity();
  }
}
