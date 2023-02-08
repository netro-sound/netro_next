import { createElement, ReactNode } from 'react';
import { classNames } from '@/utils';

type Props = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: ReactNode;
  pulse?: boolean;
};
export default function Skeleton({ as, className, children }: Props) {
  const el = createElement(as ?? 'div', {
    className: classNames('animate-pulse inline-block', className),
  });

  return <>{children ?? el}</>;
}
