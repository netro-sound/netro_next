import { create } from 'zustand';
import { IUser } from '@/interfaces/UserInterface';
import { parseISO } from 'date-fns';
import AuthService from '@/services/AuthService';

export interface IAuthStore {
  token?: string;
  expires?: string;
  user?: IUser;
  isAuthenticated: () => boolean;
  login: (cpf: string, password: string, keep?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  clear: () => void;
  update: (
    user: IUser | undefined,
    token: string,
    expires: string,
    strategy?: string
  ) => void;
  checkAuth: () =>
    | undefined
    | {
        user: IUser | undefined;
        token: string | undefined;
        expires: string | undefined;
      };
  storage?: Storage;
}

const useAuthStore = create<IAuthStore>((set, get) => ({
  user: undefined,
  token: undefined,
  expires: undefined,
  storage: undefined,
  isAuthenticated: () => !!get().user,
  login: async (username: string, password: string, keep?: boolean) => {
    try {
      const data = await new AuthService().login(username, password);

      console.log('data', data);

      get().update(
        data.user,
        data.token,
        data.expiry,
        keep ? 'localStorage' : 'sessionStorage'
      );

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  clear() {
    set({ user: undefined });
    set({ token: undefined });
    set({ expires: undefined });
    set({ storage: localStorage });

    localStorage.clear();
    sessionStorage.clear();
  },
  update(user: IUser | undefined, token: string, expires: string, strategy?) {
    set({
      storage: strategy === 'localStorage' ? localStorage : sessionStorage,
    });
    localStorage.setItem('NETRO.strategy', strategy || 'sessionStorage');

    set({ token: token });
    set({ expires: expires });
    set({ user: user });
    // @ts-ignore
    get().storage.setItem('NETRO.token', token);
    // @ts-ignore
    get().storage.setItem('NETRO.expires', expires);
    // @ts-ignore
    get().storage.setItem('NETRO.user', JSON.stringify(user));
  },
  checkAuth() {
    const strategy = localStorage.getItem('NETRO.strategy') || 'sessionStorage';
    const storage = strategy === 'localStorage' ? localStorage : sessionStorage;

    if (get().token && get().expires && get().user) {
      return { user: get().user, token: get().token, expires: get().expires };
    }

    const token = storage.getItem('NETRO.token');
    const expires = storage.getItem('NETRO.expires');
    const user = storage.getItem('NETRO.user');
    const dateExpires = expires ? parseISO(expires) : new Date();

    if (!!expires && dateExpires > new Date() && !!token && !!user) {
      set({ expires: expires });
      set({ token: token });
      set({ user: JSON.parse(user) as IUser });
      set({ storage: storage });
      return { token, expires, user: JSON.parse(user) as IUser };
    }

    return undefined;
  },
  logout: async () => {
    try {
      await new AuthService().logout();
      get().clear();
    } catch (e) {
      console.log(e);
    }
  },
}));

export { useAuthStore };
