import React from 'react';
import Image from 'next/image';
import { concatAPIUrl } from '@/utils';
import { IThumbnail } from '@/interfaces/ThumbnailInterface';

type Props = {
  className?: string;
  thumbnails?: IThumbnail[];
  index?: number;
  src?: string;
  alt: string;
};
export default function ImageSkeleton({
  className,
  thumbnails,
  src,
  index = 0,
  alt,
}: Props) {
  if (src) {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop as string),
    });

    // @ts-ignore
    const size = parseInt(params['w'] || params['h'] || '96');

    return (
      <Image
        src={src}
        height={size}
        width={size}
        alt={alt}
        className={className}
      />
    );
  }

  if (!thumbnails?.length) {
    return (
      <Image
        src={'/img/netro_holder.png'}
        height={612}
        width={612}
        alt={'Netro Sound'}
        className={className}
      />
    );
  }

  return (
    <Image
      src={concatAPIUrl(thumbnails[index].image)}
      height={thumbnails[index].height}
      width={thumbnails[index].width}
      alt={alt}
      className={className}
    />
  );
}
