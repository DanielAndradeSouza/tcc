'use client';

import { useAuth } from '@/app/hooks/useAuth';
import ButtonRequest from '../../components/button_request';

import { useState, useEffect } from 'react';
import { fetchData } from '@/app/services/api';
import { useRouter } from 'next/navigation';
import ConfirmationModal from '@/app/components/modals/confirmation_modal';
import styled from 'styled-components';

export default function ProfilePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: user, loading } = useAuth<User>('user/findOne');
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  if (loading) return <CenteredText>Carregando perfil...</CenteredText>;
  if (!user) return <CenteredText>Não foi possível carregar os dados do perfil.</CenteredText>;

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  async function handleConfirm() {
    try {
      await fetchData(`user/deactivate/${user.id}`, {
        method: 'PATCH',
        credentials: 'include',
      });
      console.log('Usuário Desativado!');
      closeModal();
      await localStorage.clear();
      await fetchData(`auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      router.push('create_account');
    } catch (e) {
      console.error('Erro ao desativar usuário:', e);
    }
  }

  async function handleLogout() {
    try {
      await localStorage.clear();
      await fetchData(`auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      router.push('login');
    } catch (e) {
      console.error('Erro ao fazer logout:', e);
    }
  }

  return (
    <MainContainer>
      <Card>
        <Title>Perfil</Title>

        <FormGroup>
          <Label htmlFor="username">Username:</Label>
          <Input
            id="username"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>

        <ButtonWrapper>
          <ButtonRequest
            show_text="Atualizar Dados"
            url={`/user/${user.id}`}
            header={{
              method: 'PATCH',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...user,
                name,
                email,
              }),
            }}
            onSuccess={() => alert('Dados Atualizados com Sucesso!')}
            onError={() => alert('Erro de requisição.')}
          />
        </ButtonWrapper>

        <DangerZone>
          <DangerButton onClick={openModal}>Desativar Conta</DangerButton>
          <ConfirmationModal
            isOpen={modalOpen}
            onClose={closeModal}
            onConfirm={handleConfirm}
            title="Você tem certeza?"
            message="Tem certeza que deseja desativar sua conta?"
          />
        </DangerZone>

        <LogoutWrapper>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </LogoutWrapper>
      </Card>
    </MainContainer>
  );
}

// Styled-components
const MainContainer = styled.main`
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3a8a, #111827);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  max-width: 450px;
  width: 100%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  color: white;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  color: #d1d5db;
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 0.6rem 0.9rem;
  border: none;
  border-radius: 0.6rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;

  &:focus {
    outline: 2px solid #3b82f6;
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 2rem;
`;

const DangerZone = styled.div`
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
`;

const DangerButton = styled.button`
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 0.75rem;
  padding: 0.6rem 1.25rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #dc2626;
  }
`;

const LogoutWrapper = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
`;

const LogoutButton = styled.button`
  background-color: #6b7280;
  color: white;
  border: none;
  border-radius: 0.75rem;
  padding: 0.6rem 1.25rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4b5563;
  }
`;

const CenteredText = styled.p`
  text-align: center;
  padding-top: 4rem;
  color: white;
`;
