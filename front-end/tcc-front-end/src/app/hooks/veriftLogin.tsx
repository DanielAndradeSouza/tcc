'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchData } from '@/app/services/api';

export function useRedirectIfAuthenticated(endpoint = 'user/findOne') {
  const router = useRouter();

  useEffect(() => {
    async function check() {
      try {
        await fetchData(endpoint, { credentials: 'include' });
        router.push('/tables'); // já está logado, vai pra home
      } catch (err: any) {
        if (err.status !== 401) {
          console.error('Erro inesperado ao verificar autenticação:', err);
        }
      }
    }

    check();
  }, [endpoint, router]);
}
