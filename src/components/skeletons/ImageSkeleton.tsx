import { createElement, ReactNode } from 'react';
import Image from 'next/image';

type Props = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: ReactNode;
};
export default function ImageSkeleton({ as, className, children }: Props) {
  return (
    <>
      {children ?? (
        <Image
          src={`animate-pulse inline-block rounded-box ${className ?? ''}`}
          alt={'Image skeleton'}
        />
      )}
    </>
  );
}
