'use client';

import ConfirmationModal from "@/app/components/modals/confirmation_modal";
import { useAuth } from "@/app/hooks/useAuth";
import { fetchData } from "@/app/services/api";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function TableIdPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  const { data: table, loading } = useAuth<Table | null>(`table/${id}`, null);

  function handleUpdatePage() {
    router.push(`/tables/description_table/${id}/update_table`);
  }

  function openModal(){
    setModalOpen(true);
  }
  function closeModal(){
    setModalOpen(false);
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
  async function handleConfirmation(){
    try{
      const deletedTable = await fetchData(`table/${id}` ,{credentials:'include', method:'DELETE'});
      router.push("tables");
    }catch(e){
      alert("Erro ao excluir a mesa!");
    }
  }
  return (
    <div>
      <h1>{table.table_name}</h1>
      <p>{table.description}</p>
      <button onClick={handleScenePage}>Iniciar Mesa</button>
      <button onClick={handleUpdatePage}>Atualizar Dados da Mesa</button>
      <button onClick={openModal}>Deletar Mesa</button>
      <ConfirmationModal isOpen={modalOpen} onClose={closeModal} onConfirm={handleConfirmation} 
      title="Tem Certeza que deseja excluir a mesa?" message="O mesa será excluida permanentemente, tem certeza que deseja excluir a mesa?"
      />
    </div>
  );
}
