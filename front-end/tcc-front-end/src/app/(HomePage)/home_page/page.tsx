'use client';

import { fetchData } from "@/app/services/api";
import React, { useEffect, useState } from 'react';

export default function HomePage() {
    const [tables, setTables] = useState<{ id: number; table_name: string }[]>([]);

  useEffect(() => {
    async function loadTables() {
      const data = await fetchData('table/findAll', {credentials: 'include'});
      setTables(data);
    }
    loadTables();
  }, []);

  return (
    <div>
      {tables.map((table, id) => (
        <div key={id}>
          {table.table_name}
        </div>
      ))}
    </div>
  );
}
