'use client';

import { fetchData } from "@/app/services/api";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import CreateSceneModal from "../modals/create_scene_modal";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ToggleButton = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const SceneList = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  padding: 8px;
  z-index: 100;
  min-width: 200px;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
`;

const SceneButton = styled.button`
  width: 100%;
  padding: 6px 10px;
  margin-bottom: 4px;
  text-align: left;
  background-color: #e0f0ff;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #c0e0ff;
  }
`;

const CreateSceneButton = styled(SceneButton)`
  background-color: #d4edda;
  font-weight: bold;

  &:hover {
    background-color: #c3e6cb;
  }
`;

export function DropDownSceneList() {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const fetchScenes = async () => {
    const tableId = localStorage.getItem("tableId");
    if (!tableId) return;

    try {
      const allScenes = await fetchData(`table/${tableId}/scene`, { credentials: 'include' });
      setScenes(allScenes);
    } catch (error) {
      console.error("Erro ao buscar cenas:", error);
    }
  };

  useEffect(() => {
    fetchScenes();
  }, []);

  const handleSceneChange = (sceneId: number) => {
    localStorage.setItem("sceneId", sceneId.toString());
    router.push(`/gm/scene/${sceneId}`);
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleCreated = (newScene: Scene) => {
    setScenes(prev => [...prev, newScene]);
    setModalOpen(false);
  };

  return (
    <DropdownContainer>
      <ToggleButton
        alt="Abrir lista de cenas"
        onClick={() => setVisible(prev => !prev)}
      />

      {visible && (
        <SceneList>
          {scenes.map(scene => (
            <SceneButton
              key={scene.id}
              onClick={() => handleSceneChange(scene.id)}
            >
              {scene.title}
            </SceneButton>
          ))}
          <CreateSceneButton onClick={handleOpenModal}>
            + Criar nova cena
          </CreateSceneButton>
        </SceneList>
      )}

      <CreateSceneModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onCreated={handleCreated}
      />
    </DropdownContainer>
  );
}
