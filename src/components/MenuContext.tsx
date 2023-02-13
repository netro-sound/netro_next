import { ContextMenuPoints } from '@/hooks/useContextMenu';
import { ReactNode } from 'react';
import { classNames } from '@/utils';

type Props = {
  points: ContextMenuPoints;
  show: boolean;
  menuItems: {
    label?: string | ReactNode;
    onClick?: () => void;
  }[];
};
export default function MenuContext({ points, menuItems, show }: Props) {
  return (
    <div
      className={classNames(
        'absolute z-50 w-max h-max bg-base-100 rounded-box shadow-lg py-2 px-4',
        show ? 'block' : 'hidden'
      )}
      style={{
        top: points.y,
        left: points.x,
      }}
    >
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <>
            {Object.keys(item).length === 0 ? (
              index < menuItems.length - 1 && (
                <li className="h-[1px] bg-base-200" />
              )
            ) : (
              <li
                key={index}
                className="hover:text-primary cursor-pointer"
                onClick={item.onClick}
              >
                {item.label}
              </li>
            )}
          </>
        ))}
      </ul>
    </div>
  );
}
