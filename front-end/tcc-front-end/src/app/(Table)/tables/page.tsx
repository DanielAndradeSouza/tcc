'use client';

import { fetchData } from "@/app/services/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';

export default function TablesPage() {
  const router = useRouter();
  const [tables, setTables] = useState<{ id: number; table_name: string }[]>([]);

  useEffect(() => {
    async function loadTables() {
      try {
        const data = await fetchData('table/findAll', { credentials: 'include' });
        setTables(data);
      } catch (e) {
        console.error(e);
      }
    }
    loadTables();
  }, []);

  async function handleClick(tableId: number) {
    router.push(`table/${tableId}`)
  }

  return (
    <div>
      {tables.map((table) => (
        <div key={table.id}>
          <button onClick={() => handleClick(table.id)}>
            {table.table_name}
          </button>
        </div>
      ))}
    </div>
  );
}
