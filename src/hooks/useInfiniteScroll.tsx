import { useEffect, useRef, useState } from 'react';

function useInfiniteScroll(
  callback: () => void,
  target: HTMLElement | null,
  root: HTMLElement | null,
  rootMargin = 100
) {
  const [isFetching, setIsFetching] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!target) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isFetching) {
            setIsFetching(true);
            callback();
          }
        });
      },
      { root: root, rootMargin: `0px 0px ${rootMargin}px 0px` }
    );

    observer.current.observe(target);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [callback, isFetching, target, rootMargin]);

  const setIsFetchingFalse = () => {
    setIsFetching(false);
  };

  return [isFetching, setIsFetchingFalse] as const;
}

export default useInfiniteScroll;
