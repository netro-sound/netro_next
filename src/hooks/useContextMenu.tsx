import { useState } from 'react';

export type ContextMenuPoints = {
  x: number;
  y: number;
};

export default function useContextMenu<T>() {
  const [points, setPoints] = useState<ContextMenuPoints>(
    {} as ContextMenuPoints
  );
  const [show, setShow] = useState(false);
  const [item, setItem] = useState<T>({} as T);

  const handleContextMenu = (e: React.MouseEvent, item: T) => {
    e.preventDefault();
    setPoints({ x: e.pageX, y: e.pageY });
    setShow(true);
    setItem(item);
    document.addEventListener('click', handleClose);
  };

  const handleClose = () => {
    setShow(false);
    document.removeEventListener('click', handleClose);
  };

  return {
    handleContextMenu,
    handleClose,
    points,
    show,
    item,
  };
}
