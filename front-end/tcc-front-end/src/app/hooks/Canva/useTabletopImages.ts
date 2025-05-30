import { useState } from 'react';

export const useTabletopImages = () => {
  const [placedImages, setPlacedImages] = useState<SceneImage[]>([]);

  const addImage = (
    base64Image: string,
    filename: string,
    width: number = 64,
    height: number = 64
  ) => {
    const newImage: SceneImage = {
      id: `${filename}-${Date.now()}`,
      x_pos: 0, // posição inicial
      y_pos: 0,
      width,    // usa o valor passado ou padrão (64)
      height,   // idem
      image_url: `data:image/png;base64,${base64Image}`,
    };
    setPlacedImages((prev) => [...prev, newImage]);
  };

  const updateImagePosition = (id: string, x: number, y: number) => {
    setPlacedImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, x_pos: x, y_pos: y } : img
      )
    );
  };

  const updateImageSize = (id: string, width: number, height: number) => {
    setPlacedImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, width, height } : img
      )
    );
  };

  return {
    placedImages,
    addImage,
    updateImagePosition,
    updateImageSize, // útil para redimensionamento
  };
};