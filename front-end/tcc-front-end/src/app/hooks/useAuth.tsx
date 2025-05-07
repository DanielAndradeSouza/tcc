// app/hooks/useAuth.tsx
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
        if (err.status === 401) {
          console.warn("Não autenticado. Redirecionando para login...");
          router.push('/login');
        } else {
          console.error("Erro ao carregar dados:", err);
        }
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [endpoint]);

  return { data, loading };
}
