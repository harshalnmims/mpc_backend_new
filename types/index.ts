import { UUID } from 'crypto';
import { Logger } from 'winston';
import { UserSessionData } from './user';

declare global {
   namespace Express {
      interface Locals {
         requestId: string;
         logger: Logger;
         userSessionData: UserSessionData;
      }
   }
}
