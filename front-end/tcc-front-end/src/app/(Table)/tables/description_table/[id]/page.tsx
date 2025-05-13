'use client';

import { useAuth } from "@/app/hooks/useAuth";
import { fetchData } from "@/app/services/api";
import { useParams, useRouter } from "next/navigation";

export default function TableIdPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: table, loading } = useAuth<Table | null>(`table/${id}`, null);

  function handleUpdatePage() {
    router.push(`/tables/description_table/${id}/update_table`);
  }

  async function handleScenePage(){
    const userRole = await fetchData(`auth/profile/${id}`,{credentials:'include'})
    switch(userRole){
      case 'gm':
        const scene_atualGM = await fetchData(`table/${id}/gmscene`,{credentials:'include'});
        localStorage.setItem("tableId",`${id}`);
        localStorage.setItem("sceneId",scene_atualGM);
        await router.push(`/gm/scene/${scene_atualGM}`);
        break;
      case 'player':
        const scene_atualPlayer = await fetchData(`table/${id}/playerscene`,{credentials:'include'});
        localStorage.setItem("tableId",`${id}`);
        localStorage.setItem("sceneId",scene_atualPlayer);
        await router.push(`/player/scene/${scene_atualPlayer}`);
        break;
      default:
        alert("Erro ao sincronizar dados da Mesa!");
    }
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
      <button onClick={handleScenePage}>Iniciar Mesa</button>
      <button onClick={handleUpdatePage}>Atualizar Dados da Mesa</button>
    </div>
  );
}
