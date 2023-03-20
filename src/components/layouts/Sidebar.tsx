import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useState,
} from 'react';
import {
  RiAlbumFill,
  RiDatabase2Fill,
  RiDiscFill,
  RiFlaskFill,
  RiHome4Fill,
  RiMicFill,
  RiMoonFill,
  RiRadio2Fill,
  RiSunFill,
} from 'react-icons/ri';
import { useRouter } from 'next/router';
import { classNames } from '@/utils';
import Link from 'next/link';
import NetroSoundLogo from '@/components/svg/NetroSoundLogo';
import { useAuthStore } from '@/stores/useAuthStore';
import { toastError } from '@/lib/toasts';
import useTheme from '@/hooks/useTheme';
import AudioRecorder from '@/components/AudioRecorder';

type Props = {
  children: ReactNode;
};

export default function Sidebar({ children }: Props) {
  const router = useRouter();
  const [logout] = useAuthStore((state) => [state.logout]);
  const [open, setOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();

  const linksSidebar = [
    {
      name: 'Home',
      href: '/',
      icon: <RiHome4Fill />,
    },
    {
      name: 'Tracks',
      href: '/tracks',
      icon: <RiDiscFill />,
    },
    {
      name: 'Artists',
      href: '/artists',
      icon: <RiMicFill />,
    },
    {
      name: 'Albums',
      href: '/albums',
      icon: <RiAlbumFill />,
    },
    {
      name: 'Playlists',
      href: '/playlists',
      icon: <RiRadio2Fill />,
    },
    {
      name: 'Datasets',
      href: '/datasets',
      icon: <RiDatabase2Fill />,
    },
    {
      name: 'Experiments',
      href: '/experiments',
      icon: <RiFlaskFill />,
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

  async function handleLogout() {
    try {
      await logout();
      await router.reload();
    } catch (error: any) {
      toastError(error?.message);
    }
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
        <div className="h-full py-4 bg-base-100 dark:bg-base-100 text-base-content flex flex-col items-center">
          <div className="my-4 mx-4">
            <Link href={'/'} onClick={closeSidebar}>
              <NetroSoundLogo className="text-primary h-16" />
            </Link>
          </div>

          <ul className="space-y-2 w-full px-4">
            {linksSidebar.map((link) => (
              <li
                key={link.name}
                className={classNames(
                  router.pathname.startsWith(link.href) &&
                    'bg-gradient-to-r from-primary/25 to-transparent text-primary rounded-box relative after:border-l-2 after:absolute after:left-0 after:h-6 after:w-2 after:top-1/2 after:-translate-y-1/2 after:bg-primary after:rounded-full',
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

          <AudioRecorder className="mt-auto" />
          <div className="flex items-center mt-auto gap-4">
            <button className="btn btn-outline btn-sm" onClick={handleLogout}>
              Logout
            </button>
            <button
              className="btn btn-outline btn-sm"
              onClick={toggleTheme}
              title="Toggle Dark Mode"
            >
              {theme === 'light' ? (
                <RiMoonFill className="w-5 h-5" />
              ) : (
                <RiSunFill className="w-5 h-5" />
              )}
            </button>
          </div>
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
