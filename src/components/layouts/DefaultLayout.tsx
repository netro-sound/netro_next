import { ReactNode } from 'react';
import Sidebar from '@/components/layouts/Sidebar';
import HeaderContainer from '@/components/layouts/HeaderContainer';
import PlayerContainer from '@/components/layouts/PlayerContainer';

type Props = { children: ReactNode };

export default function DefaultLayout({ children }: Props) {
  return (
    <>
      <Sidebar>
        <HeaderContainer />
        <PlayerContainer />
        {children}
      </Sidebar>
    </>
  );
}
