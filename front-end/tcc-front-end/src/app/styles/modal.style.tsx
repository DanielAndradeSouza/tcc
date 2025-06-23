import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0; /* top:0; right:0; bottom:0; left:0; */
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background-color: #1f2937; /* fundo escuro */
  color: white;
  padding: 2rem 2.5rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 420px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.6);
  position: relative;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const ModalButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.6rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ef4444; /* vermelho vibrante */
  }
`;

// Caso use input dentro do modal, segue estilização alinhada:
export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transition: background-color 0.3s ease;

  &:focus {
    outline: 2px solid #3b82f6;
    background-color: rgba(255, 255, 255, 0.15);
  }
`;
