'use client'
// pages/PageUser.tsx
import { useState } from "react";
import ButtonRequest from "../../components/button_request";
import { useRouter } from "next/navigation";

export default function CreateTablePage() {
  const router = useRouter();
  const [table_name, setTableName] = useState('');
  const [description, setDescription] = useState('');
  return (
    <div>
        <h1>Criar Conta</h1>

        <div>
        <label htmlFor="table_name">Nome da Mesa</label>
        <input type="text" name="table_name" onChange={(e) => setTableName(e.target.value)}/>
        </div>
        <div>
        <label htmlFor="description">Descrição</label>
        <input type="text" name="description" onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <div>
        <ButtonRequest show_text="Criar Mesa" url="/table/create" 
            header={{
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({table_name,description})
          }} 
          onSuccess={() =>{alert("Mesa Criada com Sucesso!");
            router.push("/tables")
          }}
        />

      </div>
    </div>
  );
}
