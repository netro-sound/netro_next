import { useCallback, useState } from 'react';

type AsyncState<T> = {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
};

type AsyncCallback<T> = () => Promise<T>;

const useExecuteAsync = <T,>(
  callback: AsyncCallback<T>
): {
  isLoading: boolean;
  data: T | null;
  error: Error | null;
  execute: () => Promise<void>;
} => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await callback();
      setData(response);
    } catch (error) {
      setError(error as Error);
    }
    setIsLoading(false);
  }, [callback]);

  return { data, error, isLoading, execute };
};

export default useExecuteAsync;
