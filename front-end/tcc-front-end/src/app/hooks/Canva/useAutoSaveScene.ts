import { useEffect } from "react";

export const useAutoSaveScene = (
  sceneId: string | null,
  placedImages: SceneImage[]
) => {
  useEffect(() => {
    if (!sceneId || placedImages.length === 0) return;

    const interval = setInterval(() => {
      fetch("/api/scene_images/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          sceneId,
          images: placedImages,
        }),
      }).catch((err) =>
        console.error("Erro ao salvar estado da cena:", err)
      );
    }, 30000); // a cada 30 segundos

    return () => clearInterval(interval);
  }, [sceneId, placedImages]);
};
