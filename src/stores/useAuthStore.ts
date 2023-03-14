import { create } from 'zustand';
import { IUser } from '@/interfaces/UserInterface';
import { parseISO } from 'date-fns';
import AuthService from '@/services/AuthService';
import { IAuth } from '@/interfaces/AuthInterface';

export interface IAuthStore {
  token?: string;
  expiry?: string;
  user?: IUser;
  session?: IAuth;
  isAuthenticated: () => boolean;
  login: (cpf: string, password: string, keep?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  clear: () => void;
  update: (session?: IAuth, strategy?: string) => void;
  checkAuth: () =>
    | undefined
    | {
        user: IUser | undefined;
        token: string | undefined;
        expiry: string | undefined;
      };
  storage?: Storage;
}

const useAuthStore = create<IAuthStore>((set, get) => ({
  user: undefined,
  token: undefined,
  expiry: undefined,
  storage: undefined,
  isAuthenticated: () => !!get().user,
  login: async (username: string, password: string, keep?: boolean) => {
    try {
      const data = await new AuthService().login(username, password);

      get().update(data, keep ? 'localStorage' : 'sessionStorage');

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  clear() {
    set({ user: undefined });
    set({ token: undefined });
    set({ expiry: undefined });
    set({ storage: localStorage });

    localStorage.clear();
    sessionStorage.clear();
  },
  update(session?: IAuth, strategy?: string) {
    const { user, token, expiry } = session || {};

    set({
      storage: strategy === 'localStorage' ? localStorage : sessionStorage,
    });
    localStorage.setItem('NETRO.strategy', strategy || 'sessionStorage');

    set({ token: token });
    set({ expiry: expiry });
    set({ user: user });
    set({ session: session });

    // @ts-ignore
    get().storage.setItem('NETRO.token', token);
    // @ts-ignore
    get().storage.setItem('NETRO.expiry', expiry);
    // @ts-ignore
    get().storage.setItem('NETRO.user', JSON.stringify(user));
  },
  checkAuth() {
    const strategy = localStorage.getItem('NETRO.strategy') || 'sessionStorage';
    const storage = strategy === 'localStorage' ? localStorage : sessionStorage;

    if (get().token && get().expiry && get().user) {
      return { user: get().user, token: get().token, expiry: get().expiry };
    }

    const token = storage.getItem('NETRO.token');
    const expiry = storage.getItem('NETRO.expiry');
    const user = storage.getItem('NETRO.user');
    const dateexpiry = expiry ? parseISO(expiry) : new Date();

    if (!!expiry && dateexpiry > new Date() && !!token && !!user) {
      set({ expiry: expiry });
      set({ token: token });
      set({ user: JSON.parse(user) as IUser });
      set({ storage: storage });
      return { token, expiry, user: JSON.parse(user) as IUser };
    }

    return undefined;
  },
  logout: async () => {
    try {
      get().clear();
      await new AuthService().logout();
      window.location.href = '/auth/login';
    } catch (e) {
      console.log(e);
    }
  },
}));

export { useAuthStore };
