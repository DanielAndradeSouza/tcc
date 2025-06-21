'use client';

import ConfirmationModal from "@/app/components/modals/confirmation_modal";
import { useAuth } from "@/app/hooks/useAuth";
import { fetchData } from "@/app/services/api";
import { Container, InfoSection, PlayerName, PlayersSidebar, Button } from "@/app/styles/descriptionPage.style";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function TableIdPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const router = useRouter();

  const { data: table, loading } = useAuth<Table | null>(`table/${id}`, null);
  const { data: players, loading: loadingPlayers } = useAuth<User[] | null>(`table/${id}/players`, null);

  function handleUpdatePage() {
    router.push(`/tables/description_table/${id}/update_table`);
  }

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  async function handleScenePage() {
    const userRole = await fetchData(`auth/profile/${id}`, { credentials: 'include' });

    switch (userRole) {
      case 'gm':
        const sceneGM = await fetchData(`table/${id}/gmscene`, { credentials: 'include' });
        localStorage.setItem("tableId", `${id}`);
        localStorage.setItem("sceneId", `${sceneGM}`);
        await router.push(`/gm/scene/${sceneGM}`);
        break;
      case 'player':
        const scenePlayer = await fetchData(`table/${id}/playerscene`, { credentials: 'include' });
        localStorage.setItem("tableId", `${id}`);
        localStorage.setItem("sceneId", `${scenePlayer}`);
        await router.push(`/player/scene/${scenePlayer}`);
        break;
      default:
        alert("Erro ao sincronizar dados da Mesa!");
    }
  }

  async function handleConfirmation() {
    try {
      await fetchData(`table/${id}`, { credentials: 'include', method: 'DELETE' });
      router.push("/tables");
    } catch (e) {
      alert("Erro ao excluir a mesa!");
    }
  }

  if (loading) return <p>Carregando dados da mesa...</p>;
  if (!table) return <p>Não foi possível carregar a mesa.</p>;

  return (
    <Container>
      <InfoSection>
        <h1>{table.table_name}</h1>
        <p>{table.description}</p>

        <Button onClick={handleScenePage}>Iniciar Mesa</Button>
        <Button onClick={openModal}>Deletar Mesa</Button>

        <ConfirmationModal
          isOpen={modalOpen}
          onClose={closeModal}
          onConfirm={handleConfirmation}
          title="Tem certeza que deseja excluir a mesa?"
          message="A mesa será excluída permanentemente, tem certeza que deseja excluir?"
        />
      </InfoSection>

      <PlayersSidebar>
        <h2>Jogadores</h2>
        {loadingPlayers && <p>Carregando jogadores...</p>}
        {players?.map((player) => (
          <PlayerName key={`player-${player.id}`}>{player.name}</PlayerName>
        ))}
        <div
          style={{ marginTop: "1rem", color: "#007bff", textDecoration: "underline", cursor: "pointer" }}
          onClick={() => {
            navigator.clipboard.writeText(`${window.location.origin}/tables/join/${table.id}`);
            alert("Link copiado para a área de transferência!");
          }}
        >
          Convidar Jogador
        </div>
      </PlayersSidebar>
    </Container>
  );
}
