import { ReactNode } from 'react';
import { classNames } from '@/utils';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function ContentWrapper({ children, className }: Props) {
  return (
    <>
      <div className={classNames('mx-2 md:mx-12 space-y-4', className)}>
        {children}
      </div>
    </>
  );
}
