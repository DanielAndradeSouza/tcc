import { useRef } from "react";
import socket from "@/app/utls/socket";

export function useSceneSocketSender(sceneId: string | null) {
  const lastSentStateRef = useRef<SceneImage[] | null>(null);

  const sendSceneState = (newState: SceneImage[]) => {
    if (!sceneId) {
      console.warn("⚠️ Scene ID não definido, não foi possível enviar estado via socket.");
      return;
    }

    // Compara se o estado novo é igual ao último enviado, evita envio duplicado
    const isEqual = JSON.stringify(newState) === JSON.stringify(lastSentStateRef.current);
    if (isEqual) {
      // console.log("Estado igual ao último enviado, ignorando.");
      return;
    }

    if (!socket.connected) {
      console.warn("Socket conectando....");
      socket.once("connect", () => {
        socket.emit("saveSceneState", {
          sceneId,
          newState,
          senderId: socket.id,
        });
        lastSentStateRef.current = newState;
        console.log("Estado enviado após conexão via socket:", newState);
      });
      return;
    }

    socket.emit("saveSceneState", {
      sceneId,
      newState,
      senderId: socket.id,
    });

    lastSentStateRef.current = newState;
    console.log("Estado da cena enviado via socket:", newState);
  };

  return { sendSceneState };
}
