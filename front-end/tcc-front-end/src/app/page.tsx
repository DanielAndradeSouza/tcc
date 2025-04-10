'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleGoToCreateUser = () => {
    router.push('/create_user');
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Bem-vindo ao VTT RPG!</h1>
      <p>Faça login para acessar sua conta.</p>
      <p>Não tem uma conta ainda?</p>
      <button
        onClick={handleGoToCreateUser}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer',
        }}
      >
        Criar Conta
      </button>
    </main>
  );
}
