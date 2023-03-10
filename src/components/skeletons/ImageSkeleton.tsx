import React from 'react';
import Image from 'next/image';
import { concatAPIUrl } from '@/utils';

type Props = {
  className?: string;
  src: string | undefined;
  alt: string;
  checker?: boolean;
  height?: number;
  width?: number;
};
export default function ImageSkeleton({
  className,
  src,
  checker,
  height,
  width,
  alt,
}: Props) {
  return (
    <>
      {checker || src ? (
        <Image
          src={concatAPIUrl(src)}
          height={height}
          width={width}
          alt={alt}
          className={className}
        />
      ) : (
        <Image
          src={'/istockphoto-1147544807-612x612.jpg'}
          height={612}
          width={612}
          alt={'Netro Sound'}
          className={className}
        />
      )}
    </>
  );
}
