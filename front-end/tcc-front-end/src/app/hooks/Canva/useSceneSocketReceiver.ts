import { useEffect } from "react";
import socket from "@/app/utls/socket";

export default function useSceneSocketReceiver(
  sceneId: string | null,
  setImages: (images: SceneImage[]) => void
) {
  useEffect(() => {
    if (!sceneId) return;

    const handleUpdate = (newState: SceneImage[]) => {
      console.log("Recebido novo estado da cena:", newState);
      setImages(newState);
    };

    socket.on(`sceneStateUpdated:${sceneId}`, handleUpdate);

    // Solicita o estado inicial da cena ao entrar
    socket.emit("getSceneState", sceneId);
    socket.on(`sceneState:${sceneId}`, setImages);

    return () => {
      socket.off(`sceneStateUpdated:${sceneId}`, handleUpdate);
      socket.off(`sceneState:${sceneId}`, setImages);
    };
  }, [sceneId, setImages]);
}
