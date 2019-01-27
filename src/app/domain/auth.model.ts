import { User } from './user.model';
import { Err } from './err.model';

export interface Auth {
  user?: User;
  id: string;
  userId: string;
  ttl?: number;
  err?: Err;
}
