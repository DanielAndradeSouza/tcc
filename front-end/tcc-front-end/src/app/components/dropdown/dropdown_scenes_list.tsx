'use client';

import { fetchData } from "@/app/services/api";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation"; // App Router

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ToggleButton = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const SceneList = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? "block" : "none")};
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

export function DropDownSceneList() {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [visible, setVisible] = useState(false);
  const router = useRouter(); // 👈

  useEffect(() => {
    const fetchScenes = async () => {
      const tableId = localStorage.getItem("tableId");
      if (!tableId) return;

      try {
        const allScenes = await fetchData(`table/${tableId}/scene`, { credentials: 'include' });
        console.log("Todas as Cenas", allScenes);
        setScenes(allScenes);
      } catch (error) {
        console.error("Erro ao buscar cenas:", error);
      }
    };

    fetchScenes();
  }, []);

  const handleSceneChange = (sceneId: number) => {
    localStorage.setItem("sceneId", sceneId.toString());
    router.push(`/gm/scene/${sceneId}`); 
  };

  return (
    <DropdownContainer>
      <ToggleButton
        alt="Abrir lista de cenas"
        onClick={() => setVisible(prev => !prev)}
      />
      <SceneList visible={visible}>
        {scenes.map(scene => (
          <SceneButton
            key={scene.id}
            onClick={() => handleSceneChange(scene.id)}
          >
            {scene.title}
          </SceneButton>
        ))}
      </SceneList>
    </DropdownContainer>
  );
}
