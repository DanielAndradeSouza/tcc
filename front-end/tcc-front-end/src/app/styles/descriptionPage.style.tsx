import styled from "styled-components";

export const Container = styled.main`
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3a8a, #111827);
  color: white;
  padding: 2rem;
  display: flex;
  gap: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const InfoSection = styled.section`
  flex: 2;
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 1.5rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);

  h1 {
    margin-top: 0;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    color: #d1d5db;
  }
`;

export const Button = styled.button`
  background-color: #2563eb; /* azul vibrante */
  color: white;
  border: none;
  border-radius: 0.75rem;
  padding: 0.75rem 1.75rem;
  font-size: 1.1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(37, 99, 235, 0.5);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #1e40af;
    box-shadow: 0 7px 20px rgba(30, 64, 175, 0.7);
  }
`;

export const PlayersSidebar = styled.aside`
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 1.5rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  height: fit-content;

  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    color: #9ca3af;
  }

  div.invite-link {
    margin-top: 1rem;
    color: #3b82f6;
    text-decoration: underline;
    cursor: pointer;
    user-select: none;
    font-weight: 500;
  }
`;

export const PlayerName = styled.p`
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 1rem;
  user-select: none;
`;

