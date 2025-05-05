'use client'
import { fetchData } from "@/app/services/api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function tableIdPage(){
    const {id} = useParams();
    const router = useRouter();
    const [table,setTable] = useState<Table>();

    useEffect(() => {
        async function loadTable() {
          try {
            const data = await fetchData(`table/${id}`, { credentials: 'include' });
            setTable(data);
          } catch (e) {
            console.error(e);
          }
        }
        loadTable();
      }, []);
    async function handleUpdatePage(){
      router.push(`/tables/description_table/${id}/update_table`);
    }

    return (<div>
        <h1>{table?.table_name}</h1>
        <p>{table?.description}</p>
        <button>Iniciar Mesa</button>
        <button onClick={() => handleUpdatePage()}>Atualizar Dados da Mesa</button>
    </div>)
    
}