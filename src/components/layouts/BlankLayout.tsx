import { ReactNode } from 'react';

type Props = { children: ReactNode };

export default function BlankLayout({ children }: Props) {
  return <>{children}</>;
}
