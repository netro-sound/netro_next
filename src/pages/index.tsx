import Image from 'next/image';

type Props = {};
export default function Page({}: Props) {
  return (
    <>
      <div className="w-full h-64 relative">
        <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-base-100 z-10"></div>
        <Image src="/img/home.jpg" alt="" fill />
      </div>
    </>
  );
}
