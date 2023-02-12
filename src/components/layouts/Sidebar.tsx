import { ReactNode } from 'react';
import {
  RiAlbumLine,
  RiDiscLine,
  RiHome4Line,
  RiMicLine,
  RiRadio2Line,
} from 'react-icons/ri';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { classNames } from '@/utils';
import Link from 'next/link';

type Props = {
  children: ReactNode;
};

export default function Sidebar({ children }: Props) {
  const router = useRouter();

  const linksSidebar = [
    {
      name: 'Home',
      href: '/',
      icon: <RiHome4Line />,
    },
    {
      name: 'Tracks',
      href: '/tracks',
      icon: <RiDiscLine />,
    },
    {
      name: 'Albums',
      href: '/albums',
      icon: <RiAlbumLine />,
    },
    {
      name: 'Artists',
      href: '/artists',
      icon: <RiMicLine />,
    },
    {
      name: 'Playlists',
      href: '/playlists',
      icon: <RiRadio2Line />,
    },
  ];

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full py-4 bg-neutral text-neutral-content">
          <div className="relative h-10 my-8 mx-4">
            <Image
              src="/netrosound_jacke.svg"
              alt="Netro Sound logo"
              width={140}
              height={80}
            />
          </div>

          <ul className="space-y-2">
            {linksSidebar.map((link) => (
              <li
                key={link.name}
                className={classNames(
                  router.pathname === link.href &&
                    'border-l-2 border-primary bg-gradient-to-r from-primary/5 to-transparent text-primary',
                  'transition-colors duration-200 pl-3'
                )}
              >
                <Link
                  href={link.href}
                  className="flex items-center p-2 text-base font-normal rounded-lg"
                >
                  {link.icon}
                  <span className="ml-2">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="sm:ml-64 bg-base-100 text-base-content mb-32">
        {children}
      </div>
    </>
  );
}
