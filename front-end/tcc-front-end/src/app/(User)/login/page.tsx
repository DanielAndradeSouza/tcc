'use client';

import { useState } from 'react';
import ButtonRequest from '../../components/button_request';
import { useRouter } from 'next/navigation';
import { useRedirectIfAuthenticated } from '@/app/hooks/veriftLogin';
import styled from 'styled-components';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useRedirectIfAuthenticated();

  return (
    <MainContainer>
      <Card>
        <Title>Login</Title>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Senha</Label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>

        <ButtonWrapper>
          <ButtonRequest
            show_text="Login"
            url="/auth/login"
            header={{
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
            }}
            onSuccess={() => router.push('/tables')}
            onError={() => alert('Dados Incorretos')}
          />
        </ButtonWrapper>
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
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  color: #ffffff;
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
