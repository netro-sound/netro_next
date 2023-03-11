import { IUser } from '@/interfaces/UserInterface';

export interface IAuth {
  user: IUser;
  token: string;
  expiry: string;
}
