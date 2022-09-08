import { JwtPayload } from 'jsonwebtoken';

export interface RequestContext {
  user: JwtPayload;
}
