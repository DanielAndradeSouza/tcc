'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';

export default function HomePage() {
  const router = useRouter();

  const handleGoToCreateUser = () => {
    router.push('/create_account');
  };

  const handleGoToLogin = () => {
    router.push('/login');
  };

  return (
    <MainContainer>
      <Card>
        <Title>
          Bem-vindo ao <Highlight>VTT RPG!</Highlight>
        </Title>
        <Text>Faça login para acessar sua conta.</Text>
        <Text>Não tem uma conta ainda?</Text>
        <ButtonGroup>
          <ActionButton onClick={handleGoToCreateUser}>
            Criar Conta
          </ActionButton>
          <ActionButton $secondary onClick={handleGoToLogin}>
            Login
          </ActionButton>
        </ButtonGroup>
      </Card>
    </MainContainer>
  );
}

// Styled-components
const MainContainer = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e3a8a, #111827);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
  padding: 2rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 3rem 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Highlight = styled.span`
  color: #60a5fa;
`;

const Text = styled.p`
  margin-bottom: 0.75rem;
  color: #d1d5db;
`;

const ButtonGroup = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActionButton = styled.button<{ $secondary?: boolean }>`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  background-color: ${({ $secondary }) => ($secondary ? '#374151' : '#3b82f6')};
  color: white;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ $secondary }) => ($secondary ? '#4b5563' : '#2563eb')};
  }
`;
