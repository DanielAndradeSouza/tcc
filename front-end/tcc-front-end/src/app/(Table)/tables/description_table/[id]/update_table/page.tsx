'use client'

import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { fetchData } from "@/app/services/api";
import ButtonRequest from "@/app/components/button_request";

export default function UpdateTablePage() {
  const params = useParams();
  const id = params?.id as string;

  const [table, setTable] = useState<Table | null>(null);

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
      }
    }
    fetchTable();
  }, [id]);

  return (
    <div>
      <h1>Atualizar Mesa</h1>
      <div>
        <label htmlFor="table_name">Nome da Mesa:</label>
        <input
          type="text"
          value={table?.table_name || ""}
          onChange={(e) =>
            setTable((prev) => ({ ...prev!, table_name: e.target.value }))
          }
        />
      </div>
      <div>
        <label htmlFor="description">Descrição:</label>
        <input
          type="text"
          value={table?.description || ""}
          onChange={(e) =>
            setTable((prev) => ({ ...prev!, description: e.target.value }))
          }
        />
      </div>
      <div className="p-4">
        <ButtonRequest
          show_text="Atualizar Dados"
          url={`/table/${table?.id}`}
          header={{
            method: 'PATCH',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(table),
          }}
        />
      </div>
    </div>
  );
}
