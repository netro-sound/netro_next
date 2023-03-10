import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useState,
} from 'react';
import {
  RiAlbumLine,
  RiDiscLine,
  RiHome4Line,
  RiMicLine,
  RiRadio2Line,
} from 'react-icons/ri';
import { useRouter } from 'next/router';
import { classNames } from '@/utils';
import Link from 'next/link';
import NetroSoundLogo from '@/components/svg/NetroSoundLogo';

type Props = {
  children: ReactNode;
};

export default function Sidebar({ children }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

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

  // Assuming `children` is a prop or variable of type `ReactNode`
  const childrenWithProps = Children.map(children, (child: ReactNode) => {
    // Checking isValidElement is the safe way and avoids a
    // TypeScript error too.
    if (isValidElement(child)) {
      return cloneElement(child, {
        ...child.props,
        sideOpen: open,
        closeSidebar: setOpen,
      });
    }
    return child;
  });

  function closeSidebar() {
    setOpen(false);
  }

  return (
    <>
      <aside
        id="default-sidebar"
        className={classNames(
          open
            ? 'translate-x-0 md:translate-x-0'
            : '-translate-x-full md:translate-x-0',
          'fixed top-0 left-0 z-40 w-64 h-screen transition-transform '
        )}
        aria-label="Sidebar"
      >
        <div className="h-full py-4 bg-base-100 text-base-content">
          <div className="my-4 mx-4">
            <Link href={'/'} onClick={closeSidebar}>
              <NetroSoundLogo className="text-primary h-16" />
            </Link>
          </div>

          <ul className="space-y-2">
            {linksSidebar.map((link) => (
              <li
                key={link.name}
                className={classNames(
                  router.pathname === link.href &&
                    'border-l-2 border-primary bg-gradient-to-r from-primary/25 to-transparent text-primary',
                  'transition-colors duration-200 pl-3'
                )}
              >
                <Link
                  href={link.href}
                  onClick={closeSidebar}
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
      {open && (
        <div
          className="fixed inset-0 z-30 bg-base-200 bg-opacity-50"
          onClick={() => setOpen(false)}
        />
      )}
      <div className="md:ml-64 bg-base-100 text-base-content mb-32">
        {childrenWithProps}
      </div>
    </>
  );
}
