import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '../services/api';

export function useNotices() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const isFetching = useRef(false);

  const reload = useCallback(async () => {
    if (isFetching.current) {
      return;
    }

    isFetching.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const data = await api.get('posts?_limit=10');

      if (!Array.isArray(data)) {
        throw new Error('A API retornou uma resposta inválida.');
      }

      setNotices(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Não foi possível carregar os avisos.'
      );
    } finally {
      setIsLoading(false);
      isFetching.current = false;
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return {
    notices,
    isLoading,
    error,
    reload,
  };
}