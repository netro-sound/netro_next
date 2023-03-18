import { ReactNode } from 'react';
import { classNames } from '@/utils';

type Props = {
  children: ReactNode;
  className?: string;
  smColumns?: number;
  mdColumns?: number;
};
export default function GridWrapper({
  children,
  className = 'gap-2',
  smColumns = 1,
  mdColumns = 2,
}: Props) {
  const smColumnsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
    8: 'grid-cols-8',
    9: 'grid-cols-9',
    10: 'grid-cols-10',
  }[smColumns];

  const mdColumnsClass = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
    6: 'md:grid-cols-6',
    7: 'md:grid-cols-7',
    8: 'md:grid-cols-8',
    9: 'md:grid-cols-9',
    10: 'md:grid-cols-10',
    11: 'md:grid-cols-11',
    12: 'md:grid-cols-12',
  }[mdColumns];

  return (
    <div
      aria-label="row"
      className={classNames(
        'grid w-full',
        className,
        smColumnsClass,
        mdColumnsClass
      )}
    >
      {children}
    </div>
  );
}
