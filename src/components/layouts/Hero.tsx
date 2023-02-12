import Image from 'next/image';
import { classNames } from '@/utils';

type Props = {
  className?: string;
};

export default function Hero({ className }: Props) {
  return (
    <>
      <div className={classNames('w-full h-64 relative z-0', className)}>
        <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-base-100 z-10"></div>
        <Image src="/img/home.jpg" alt="" fill />
      </div>
    </>
  );
}
