import { useCallback, useState, useEffect } from 'react';
import { notifySessionExpired } from '../authSessionEvents';

type UseFetchOptions = RequestInit;

export const useFetch = <T>(url: string, options?: UseFetchOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, {
        credentials: 'include',
        ...options,
      });

      if (!response.ok) {
        if (response.status === 401) {
          notifySessionExpired({
            status: response.status,
            message: response.statusText || 'Invalid or expired session',
          });
        }

        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [options, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const retry = () => {
    fetchData();
  };

  return { data, loading, error, retry };
};
