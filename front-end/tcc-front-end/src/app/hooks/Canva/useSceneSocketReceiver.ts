import { useEffect } from "react";

import socket, {
  requestSceneState,
  onSceneState,
  onSceneStateUpdated,
} from "@/app/utls/socket";

export default function useSceneSocketReceiver(
  sceneId: string | null,
  setImages: (imgs: SceneImage[]) => void
) {
  useEffect(() => {
    if (!sceneId) return;
    //console.log("Id da Cena: ",sceneId);
    // Solicita o estado atual da cena
    requestSceneState(sceneId);

    // Registra os listeners
    const handleInitialState = (state: unknown) => {
      console.log(state);
      if (Array.isArray(state)) setImages(state);
    };

    const handleUpdate = (newState: unknown) => {
      if (Array.isArray(newState)) setImages(newState);
    };

    onSceneState(sceneId.toString(), handleInitialState);
    onSceneStateUpdated(sceneId.toString(), handleUpdate);

    // Cleanup dos listeners
    return () => {
      socket.off(`sceneState:${sceneId}`, handleInitialState);
      socket.off(`sceneStateUpdated:${sceneId}`, handleUpdate);
    };
  }, [sceneId, setImages]);
}
