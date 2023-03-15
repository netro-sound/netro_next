import Router, { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/stores/useAuthStore';
import BlankLayout from '@/components/layouts/BlankLayout';
import { ReactElement } from 'react';
import Link from 'next/link';
import NetroSoundLogo from '@/components/svg/NetroSoundLogo';
import { toastError, toastSuccess } from '@/lib/toasts';
import { RiEmotionHappyLine } from 'react-icons/ri';

const Login = () => {
  const [login] = useAuthStore((state) => [state.login]);
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  async function submitLogin(data: any) {
    try {
      await login(data.username, data.password);
      await router.reload();
    } catch (error: any) {
      toastError(error?.message);
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link href={'/'}>
          <NetroSoundLogo className="text-primary h-16" />
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(submitLogin)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your username
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="netrosound"
                  {...register('username')}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  {...register('password')}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white btn-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

Login.getLayout = (page: ReactElement) => <BlankLayout>{page}</BlankLayout>;
export default Login;
