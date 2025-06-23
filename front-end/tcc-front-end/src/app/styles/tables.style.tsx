import styled from "styled-components";

export const PageWrapper = styled.main`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #1e3a8a, #111827);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  padding-bottom: 1rem;
`;

export const LeftGroup = styled.div`
  display: flex;
  align-items: center;

  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    margin: 0;
  }
`;

export const ProfileSidebar = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileButton = styled.button`
  background-color: #2563eb; /* azul vibrante */
  color: white;
  border: none;
  border-radius: 0.75rem;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1e40af;
  }
`;

export const ContainerTable = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

export const TableButton = styled.button`
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  min-width: 180px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);

  &:hover {
    background-color: rgba(59, 130, 246, 0.9);
    transform: scale(1.05);
  }
`;

export const CreateButton = styled.button`
  background-color: #10b981; /* verde vibrante */
  color: white;
  border: none;
  border-radius: 1rem;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.7);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #059669;
    box-shadow: 0 6px 18px rgba(5, 150, 105, 0.9);
  }
`;
