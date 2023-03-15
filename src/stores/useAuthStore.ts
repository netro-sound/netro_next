import { create } from 'zustand';
import { IUser } from '@/interfaces/UserInterface';
import { parseISO } from 'date-fns';
import AuthService from '@/services/AuthService';
import { IAuth } from '@/interfaces/AuthInterface';
import * as process from 'process';

const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME || 'netro';

export interface IAuthStore {
  token?: string;
  expiry?: string;
  user?: IUser;
  session?: IAuth;
  isAuthenticated: () => boolean;
  login: (cpf: string, password: string, keep?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  clear: () => void;
  update: (session?: IAuth) => void;
}

const useAuthStore = create<IAuthStore>((set, get) => ({
  user: undefined,
  token: undefined,
  expiry: undefined,
  isAuthenticated: () => !!get().user,
  login: async (username: string, password: string, keep?: boolean) => {
    try {
      const data = await new AuthService().login(username, password);

      get().update(data);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  clear() {
    set({ user: undefined });
    set({ token: undefined });
    set({ expiry: undefined });
  },
  update(session?: IAuth) {
    const { user, token, expiry } = session || {};

    set({ token: token });
    set({ expiry: expiry });
    set({ user: user });
    set({ session: session });
  },
  logout: async () => {
    try {
      get().clear();
      await new AuthService().logout();
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
}));

export { useAuthStore };
