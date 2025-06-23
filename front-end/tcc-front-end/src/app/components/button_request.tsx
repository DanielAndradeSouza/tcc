'use client';

import { useState } from 'react';
import { fetchData } from '../services/api';
import styled from 'styled-components';

type ButtonRequestProps = {
  show_text: string;
  url: string;
  header: RequestInit;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
};

export default function ButtonRequest({
  show_text,
  url,
  header,
  onSuccess,
  onError,
}: ButtonRequestProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const data = await fetchData(url, header);
      if (data && !data.error) {
        onSuccess?.(data);
      } else {
        onError?.(data?.error || 'Dados Incorretos');
      }
    } catch (err: any) {
      onError?.(err.message || 'Erro na requisição');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledButton onClick={handleClick} disabled={loading}>
      {loading ? 'Carregando...' : show_text}
    </StyledButton>
  );
}

// Styled-components
const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  background-color: #3b82f6;
  color: white;
  transition: background-color 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #2563eb;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
