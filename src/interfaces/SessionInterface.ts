import { IAuth } from '@/interfaces/AuthInterface';

export interface IFlash {
  type: string;
  message: string;
}

export interface ISession {
  auth: IAuth;
  flash: IFlash;
}
