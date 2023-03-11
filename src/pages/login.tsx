import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/stores/useAuthStore';
import BlankLayout from '@/components/layouts/BlankLayout';
import { ReactElement } from 'react';

const Login = () => {
  const [login] = useAuthStore((state) => [state.login]);
  const { register, handleSubmit } = useForm();

  async function submitLogin(data: any) {
    try {
      await login(data.username, data.password);
      Router.push('/');
    } catch (error) {
      console.error('An unexpected error happened occurred:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit(submitLogin)}>
      <input type="text" {...register('username')} />
      <input type="password" {...register('password')} />
      <button type="submit">Submit</button>
    </form>
  );
};

Login.getLayout = (page: ReactElement) => <BlankLayout>{page}</BlankLayout>;

export default Login;
