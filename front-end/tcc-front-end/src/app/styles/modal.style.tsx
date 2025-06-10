import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 10px;
  width: 400px;
`;

export const Input = styled.input`
  width: 100%;
  margin-bottom: 12px;
  padding: 8px;
`;

export const ModalButton = styled.button`
  margin-top: 8px;
  padding: 8px 16px;
  background-color: #4CAF50;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
