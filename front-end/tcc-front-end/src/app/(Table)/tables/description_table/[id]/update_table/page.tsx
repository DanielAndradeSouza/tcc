'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import { fetchData } from "@/app/services/api";
import ButtonRequest from "@/app/components/button_request";

type Table = {
  id: number;
  table_name: string;
  description: string;
};

export default function UpdateTablePage() {
  const params = useParams();
  const id = params?.id as string;

  const [table, setTable] = useState<Table | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    async function fetchTable() {
      try {
        if (!id) return;
        const data = await fetchData(`table/${id}`, { credentials: 'include' });
        if (data) {
          setTable(data);
        }
      } catch (e) {
        console.error("Dados não encontrados. Mensagem: ", e);
      } finally {
        setLoading(false);
      }
    }

    fetchTable();
  }, [id]);

  if (loading) {
    return <p>Carregando dados da mesa...</p>;
  }

  if (!table) {
    return <p>Não foi possível carregar os dados da mesa.</p>;
  }

  return (
    <div>
      <h1>Atualizar Mesa</h1>
      <div>
        <label htmlFor="table_name">Nome da Mesa:</label>
        <input
          id="table_name"
          type="text"
          value={table.table_name}
          onChange={(e) =>
            setTable((prev) => prev ? { ...prev, table_name: e.target.value } : null)
          }
        />
      </div>
      <div>
        <label htmlFor="description">Descrição:</label>
        <input
          id="description"
          type="text"
          value={table.description}
          onChange={(e) =>
            setTable((prev) => prev ? { ...prev, description: e.target.value } : null)
          }
        />
      </div>
      <div className="p-4">
        <ButtonRequest
          show_text="Atualizar Dados"
          url={`/table/${table.id}`}
          header={{
            method: 'PATCH',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(table),
          }}
          onSuccess={() => router.push(`/tables/description_table/${id}`)}
          onError={() => alert("Dados Invalidos!!")}
        />
      </div>
    </div>
  );
}
