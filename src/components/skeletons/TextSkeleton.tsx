import { createElement, ReactNode } from 'react';

type Props = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: ReactNode;
};
export default function TextSkeleton({ as, className, children }: Props) {
  const el = createElement(as ?? 'div', {
    className: `animate-pulse inline-block rounded-box ${className ?? ''}`,
  });

  return <>{children ?? el}</>;
}
