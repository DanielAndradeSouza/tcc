import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem;
  gap: 2rem;
  max-width: 1200px;
  margin: auto;
`;

export const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PlayersSidebar = styled.aside`
  width: 250px;
  padding: 1rem;
  border-left: 2px solid rgba(204, 204, 204, 0.5);
  background-color: #f9f9f9;
`;

export const PlayerName = styled.p`
  margin: 0.5rem 0;
  text-align: center;
  font-weight: 500;
  color: #333;
`;

export const Button = styled.button`
  padding: 10px;
  font-size: 1rem;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #003f80;
  }
`;

