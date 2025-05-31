// styles/button.style.ts
import styled from "styled-components";

export const ListButton = styled.div`
  display: flex;
  gap: 10px; /* espaçamento entre botões */
  flex-wrap: wrap; /* se quiser que quebrem em várias linhas */
  margin-top: 10px; /* opcional, espaçamento superior */
`;

export const BlueButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #0056b3;
  }
`;

export const RedButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #b02a37;
  }
`;

export const GrayButton = styled.button`
  background-color: #6c757d;
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #565e64;
  }
`;
