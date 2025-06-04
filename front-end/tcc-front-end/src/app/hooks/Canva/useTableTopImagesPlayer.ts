import { useEffect, useState } from "react";

export const useTableTopImagesPlayer = (sceneImages: SceneImage[]) => {
  const [placedImages, setPlacedImages] = useState<SceneImage[]>([]);

  useEffect(() => {
    if (!sceneImages || sceneImages.length === 0) {
      setPlacedImages([]);
      return;
    }

    // Para o player, apenas retorna as imagens da cena diretamente,
    // sem modificar o image_url
    setPlacedImages(sceneImages);
  }, [sceneImages]);

  return { placedImages };
};
