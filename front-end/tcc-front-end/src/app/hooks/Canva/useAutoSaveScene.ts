import { fetchData } from "@/app/services/api";
import { useEffect } from "react";

export const useAutoSaveScene = (
  sceneId: string | null,
  placedImages: SceneImage[]
) => {
  useEffect(() => {
    if (!sceneId || placedImages.length === 0) return;
    console.log("Cena salva")

    const filteredImages = placedImages.map(({ id, width, height, x_pos, y_pos }) => ({
      id,
      width,
      height,
      x_pos,
      y_pos,
    }));

    const body = JSON.stringify(filteredImages); 
    const interval = setInterval(() => {
      fetchData(`scene/${sceneId}/updateImages`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body,
      }).catch((err) =>
        console.error("Erro ao salvar estado da cena:", err)
      );
    }, 30000); //30 segundos

    return () => clearInterval(interval);
  }, [sceneId, placedImages]);
};
