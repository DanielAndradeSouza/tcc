'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchData } from '@/app/services/api';

export function useAuth<T = any[]>(endpoint: string, defaultValue: T = [] as T) {
  const router = useRouter();
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const result = await fetchData(endpoint, { credentials: 'include' });
        setData(result);
      } catch (err: any) {
        console.error("Erro de autenticação, redirecionando para login:", err);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [endpoint]);

  return { data, loading };
}
