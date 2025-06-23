'use client'

import { useEffect, useState } from "react";
import ButtonRequest from "../../../components/button_request";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";  // Supondo que useAuth seja um hook para verificar autenticação
import { ButtonWrapper, Card, CenteredText, FormGroup, Input, Label, PageWrapper, Title } from "@/app/styles/create.style";

export default function CreateTablePage() {
  const router = useRouter();

  const { data: user, loading } = useAuth("user/findOne");
  const [table_name, setTableName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return <CenteredText>Carregando...</CenteredText>;
  }

  if (!user) {
    // Já redirecionou no useEffect, evita renderizar nada
    return null;
  }

  return (
    <PageWrapper>
      <Card>
        <Title>Criar Mesa</Title>

        <FormGroup>
          <Label htmlFor="table_name">Nome da Mesa</Label>
          <Input
            id="table_name"
            type="text"
            value={table_name}
            onChange={(e) => setTableName(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Descrição</Label>
          <Input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>

        <ButtonWrapper>
          <ButtonRequest
            show_text="Criar Mesa"
            url="/table/create"
            header={{
              method: 'POST',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ table_name, description }),
            }}
            onSuccess={() => {
              alert("Mesa Criada com Sucesso!");
              router.push("/tables");
            }}
            onError={(err) => alert("Erro ao criar mesa: " + err)}
          />
        </ButtonWrapper>
      </Card>
    </PageWrapper>
  );
}
