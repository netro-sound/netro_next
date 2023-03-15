import { ReactNode } from 'react';
import Sidebar from '@/components/layouts/Sidebar';
import MegaMenu from '@/components/layouts/MegaMenu';
import PlayerContainer from '@/components/layouts/PlayerContainer';

type Props = { children: ReactNode };

export default function DefaultLayout({ children }: Props) {
  return (
    <>
      <Sidebar>
        <MegaMenu />
        <PlayerContainer />
        {children}
      </Sidebar>
    </>
  );
}
