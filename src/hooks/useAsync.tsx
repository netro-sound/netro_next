import { useEffect, useState } from 'react';

function useAsync<T>(
  asyncFunction: () => Promise<T>
): [boolean, Error | null, T | null] {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const result = await asyncFunction();
        setData(result);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [asyncFunction]);

  return [isFetching, error, data];
}
