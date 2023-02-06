import { useEffect, useRef } from 'react';

const useEffectTimeout = (
  effect: () => void,
  time: number,
  deps: any[],
  allowNull: boolean = false
) => {
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!allowNull && !deps.some((i) => !!i)) return;
    timeout.current = setTimeout(() => {
      effect();
      clearTimeout(timeout.current);
    }, time);
    return () => clearTimeout(timeout.current);
  }, [...deps]);

  return {
    clearTimeout: () => clearTimeout(timeout.current),
  };
};

export default useEffectTimeout;
