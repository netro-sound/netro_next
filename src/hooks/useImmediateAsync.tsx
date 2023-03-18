import { useCallback, useEffect, useState } from 'react';

type AsyncState<T> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
};

type AsyncCallback<T> = () => Promise<T>;

const useAsync = <T,>(asyncFunction: AsyncCallback<T>): AsyncState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    try {
      const response = await asyncFunction();
      setData(response);
    } catch (error) {
      setError(error as Error);
    }
    setLoading(false);
  }, [asyncFunction]);

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, error, loading };
};

export default useAsync;
