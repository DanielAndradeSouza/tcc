'use client';

import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function TablesPage() {
  const router = useRouter();
  const { data: tables, loading } = useAuth<Table[]>('table/findAll');

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      {tables.map((table) => (
        <div key={table.id}>
          <button onClick={() => router.push(`/tables/description_table/${table.id}`)}>
            {table.table_name}
          </button>
        </div>
      ))}
      <button onClick={() => router.push('/tables/create_table')}>Criar Nova Mesa</button>
    </div>
  );
}
