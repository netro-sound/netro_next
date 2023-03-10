import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/stores/useAuth';

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

export default Login;
