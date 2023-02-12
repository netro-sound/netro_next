import { ReactNode } from 'react';
import { classNames } from '@/utils';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function ContentWrapper({ children, className }: Props) {
  return (
    <>
      <div className={classNames('mx-12', className)}>{children}</div>
    </>
  );
}
