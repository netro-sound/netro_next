import { authAxios } from '@/lib/axios';
import axios, { Axios } from 'axios';
import { IAuth } from '@/interfaces/AuthInterface';

class AuthService {
  client: Axios;

  constructor() {
    this.client = authAxios;
  }

  async login(username: string, password: string): Promise<IAuth> {
    try {
      const { data } = await axios.post('/api/login', {
        username,
        password,
      });
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async logout(): Promise<IAuth> {
    try {
      const { data } = await axios.post('/api/logout');
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default AuthService;
