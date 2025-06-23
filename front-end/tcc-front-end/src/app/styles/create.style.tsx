import styled from "styled-components";

export const PageWrapper = styled.main`
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3a8a, #111827);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const Card = styled.div`
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  color: white;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  color: #d1d5db;
  font-size: 1rem;
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.6rem;
  background-color: rgba(255,255,255,0.1);
  color: white;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:focus {
    outline: 2px solid #3b82f6;
    background-color: rgba(255,255,255,0.15);
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

export const CenteredText = styled.p`
  color: white;
  text-align: center;
  padding-top: 4rem;
`;
