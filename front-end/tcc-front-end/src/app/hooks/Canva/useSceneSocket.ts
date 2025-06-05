import { fetchData } from '@/app/services/api';
import socket from '@/app/utls/socket';
import { useEffect, useRef } from 'react';

export function useSceneSocket({
  sceneId,
  manualPlacedImages,
  setManualPlacedImages,
}: {
  sceneId: string;
  manualPlacedImages: SceneImage[];
  setManualPlacedImages: (imgs: SceneImage[]) => void;
}) {
  // Usamos ref para guardar o estado atual das imagens e evitar re-render infinito
  const currentImagesRef = useRef<SceneImage[]>([]);

  useEffect(() => {
    if (!sceneId) return;

    async function fetchSceneStateFromDB() {
      try {
        const res = await fetchData(`/scene_images/${sceneId}`, {
          credentials: 'include',
        });
        if (!res.ok) {
          console.log("Cena Vazia");
          setManualPlacedImages([]);
        } else {
          const data = await res.json();
          if (Array.isArray(data)) {
            currentImagesRef.current = data;
            setManualPlacedImages(data);
          } else {
            console.warn('Estado do banco inválido:', data);
          }
        }
      } catch (error) {
        console.error('Falha ao buscar estado no banco:', error);
      }
    }

    socket.emit('getSceneState', sceneId);

    socket.on(`sceneState:${sceneId}`, (state: unknown) => {
      console.log('Estado inicial da cena recebido do servidor via socket');
      if (Array.isArray(state) && state.length > 0) {
        currentImagesRef.current = state;
        setManualPlacedImages(state);
      } else {
        console.log('Estado inicial inválido ou vazio recebido do servidor, buscando no banco...');
        fetchSceneStateFromDB();
      }
    });

    socket.on(`sceneStateUpdated:${sceneId}`, (newState: unknown) => {
      if (Array.isArray(newState)) {
        const isEqual =
          JSON.stringify(newState) === JSON.stringify(currentImagesRef.current);
        if (!isEqual) {
          console.log('Cena atualizada por outro usuário via socket');
          currentImagesRef.current = newState;
          setManualPlacedImages(newState);
        }
      } else {
        console.warn('Novo estado de cena inválido recebido via socket:', newState);
      }
    });

    return () => {
      socket.off(`sceneState:${sceneId}`);
      socket.off(`sceneStateUpdated:${sceneId}`);
    };
  }, [sceneId, setManualPlacedImages]);

  // Emitir atualização da cena quando manualPlacedImages mudar
  useEffect(() => {
    if (!sceneId) return;
    const isEqual =
      JSON.stringify(manualPlacedImages) === JSON.stringify(currentImagesRef.current);
    if (!isEqual) {
      console.log('Emitindo atualização da cena via socket');
      socket.emit('saveSceneState', {
        sceneId,
        newState: manualPlacedImages,
      });
      currentImagesRef.current = manualPlacedImages;
    }
  }, [manualPlacedImages, sceneId]);
}
