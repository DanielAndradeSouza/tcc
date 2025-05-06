'use client';

import { fetchData } from "@/app/services/api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function TableIdPage() {
  const { id } = useParams();
  const router = useRouter();
  const [table, setTable] = useState<Table | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTable() {
      try {
        const data = await fetchData(`table/${id}`, { credentials: 'include' });
        setTable(data);
      } catch (e) {
        console.error(e);
        // Opcional: redireciona para login se não autenticado
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    loadTable();
  }, [id, router]);

  function handleUpdatePage() {
    router.push(`/tables/description_table/${id}/update_table`);
  }

  if (loading) {
    return <p>Carregando dados da mesa...</p>;
  }

  if (!table) {
    return <p>Não foi possível carregar a mesa.</p>;
  }

  return (
    <div>
      <h1>{table.table_name}</h1>
      <p>{table.description}</p>
      <button>Iniciar Mesa</button>
      <button onClick={handleUpdatePage}>Atualizar Dados da Mesa</button>
    </div>
  );
}
