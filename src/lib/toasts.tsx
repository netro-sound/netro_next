import { ReactElement } from 'react';
import toast from 'react-hot-toast';
import {
  BiCheck,
  BiError,
  BiInfoCircle,
  BiMessageAlt,
  BiX,
} from 'react-icons/bi';
import { Toast } from 'react-hot-toast/headless';
import { classNames } from '@/utils';

const defaultOptions = {
  duration: 3000,
  position: 'bottom-right',
};

const toastLayout = (
  message: string,
  t: Toast,
  icon?: ReactElement,
  className?: string
) => {
  return (
    <div
      id="toast-default"
      className="flex items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow"
      role="alert"
    >
      <div
        className={classNames(
          'inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg',
          className ?? 'text-info-content bg-info'
        )}
      >
        {icon}
        <span className="sr-only">Toast icon</span>
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
        onClick={() => toast.dismiss(t.id)}
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <BiX className="text-xl" />
      </button>
    </div>
  );
};
const toastError = (
  message: string,
  icon: ReactElement = <BiError className="text-xl" />,
  options: any = {}
) => {
  return toast.custom(
    (t) => toastLayout(message, t, icon, 'text-error-content bg-error'),
    {
      ...defaultOptions,
      ...options,
    }
  );
};

const toastSuccess = (
  message: string,
  icon: ReactElement = <BiCheck className="text-xl" />,
  options: any = {}
) => {
  return toast.custom(
    (t) => toastLayout(message, t, icon, 'text-success-content bg-success'),
    {
      ...defaultOptions,
      ...options,
    }
  );
};

const toastInfo = (
  message: string,
  icon: ReactElement = <BiInfoCircle className="text-xl" />,
  options: any = {}
) => {
  return toast.custom((t) => toastLayout(message, t, icon), {
    ...defaultOptions,
    ...options,
  });
};

const toastWarning = (
  message: string,
  icon: ReactElement = <BiMessageAlt className="text-xl" />,
  options?: any
) => {
  return toast.custom(
    (t) => toastLayout(message, t, icon, 'text-warning-content bg-warning'),
    {
      ...defaultOptions,
      ...options,
    }
  );
};

const toastCustom = (
  message: string,
  icon?: ReactElement,
  className?: string,
  options?: any
) => {
  return toast.custom((t) => toastLayout(message, t, icon, className), {
    ...defaultOptions,
    ...options,
  });
};

export { toastError, toastSuccess, toastInfo, toastWarning, toastCustom };
