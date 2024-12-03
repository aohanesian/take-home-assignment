import { useState, useEffect, useRef } from 'react';
import { ApiResponse } from '../types';

function useCharacterSearch(name: string) {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lastSearchRef = useRef<string>('');
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchCharacter = async (searchName: string) => {

    if (searchName === lastSearchRef.current) {
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      setData(null); // optionally we can omitt reseting data for cases when we get error (e.g. wrong character name), so we display error above previous results
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(searchName)}`,
        { signal }
      );

      if (!response.ok) {
        throw new Error('Character not found');
      }

      const json = await response.json();
      lastSearchRef.current = searchName;
      setData(json);

    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          setError(err.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (name.trim()) {
      fetchCharacter(name);
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [name]);

  return { data, loading, error };
}

export default useCharacterSearch;