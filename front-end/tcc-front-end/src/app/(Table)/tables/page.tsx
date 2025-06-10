'use client';

import { useAuth } from "@/app/hooks/useAuth";
import {
  ContainerTable,
  CreateButton,
  Header,
  LeftGroup,
  PageWrapper,
  ProfileButton,
  ProfileSidebar,
  TableButton
} from "@/app/styles/tables.style";
import { useRouter } from "next/navigation";

export default function TablesPage() {
  const router = useRouter();
  const { data: tables, loading } = useAuth<Table[]>('table/findAll');

  if (loading) return <p>Carregando...</p>;

  return (
    <PageWrapper>
      <Header>
        <LeftGroup>
          <h2 style={{ margin: 0 }}>Mesas Disponíveis</h2>
        </LeftGroup>
        <ProfileSidebar>
          <ProfileButton onClick={() => router.push('/profile')}>
            Perfil
          </ProfileButton>
        </ProfileSidebar>
      </Header>

      <ContainerTable>
        {tables.map((table) => (
          <TableButton
            key={table.id}
            onClick={() => router.push(`/tables/description_table/${table.id}`)}
          >
            {table.table_name}
          </TableButton>
        ))}
        <CreateButton onClick={() => router.push('/tables/create_table')}>
          Criar Nova Mesa
        </CreateButton>
      </ContainerTable>
    </PageWrapper>
  );
}
