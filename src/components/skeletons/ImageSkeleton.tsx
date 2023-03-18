import React from 'react';
import Image from 'next/image';
import { concatAPIUrl } from '@/utils';
import { IThumbnail } from '@/interfaces/ThumbnailInterface';

type Props = {
  className?: string;
  thumbnails?: IThumbnail[];
  index?: number;
  alt: string;
};
export default function ImageSkeleton({
  className,
  thumbnails,
  index = 0,
  alt,
}: Props) {
  return (
    <>
      {thumbnails?.length ? (
        <Image
          src={concatAPIUrl(thumbnails[index].image)}
          height={thumbnails[index].height}
          width={thumbnails[index].width}
          alt={alt}
          className={className}
        />
      ) : (
        <Image
          src={'/img/netro_holder.png'}
          height={612}
          width={612}
          alt={'Netro Sound'}
          className={className}
        />
      )}
    </>
  );
}
