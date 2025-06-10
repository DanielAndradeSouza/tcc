import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  padding-right: 2rem;
  margin-left: 5%;
  margin-bottom: 1.5rem;
`;

export const LeftGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ContainerTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 60%;
  margin-left: 5%;
  margin-top: 24px;
`;

export const TableButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 16px;
  border: none;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #357ab8;
  }
`;

export const CreateButton = styled(TableButton)`
  background-color: #50e3c2;

  &:hover {
    background-color: #3cbf9e;
  }
`;

export const ProfileSidebar = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileButton = styled.button`
  background-color: #f5a623;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #d48806;
  }
`;
