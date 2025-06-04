import { useEffect, useState } from "react";

export const useTableTopImagesGm = (
  userImages: { filename: string; base64Content: string }[],
  sceneImages: SceneImage[]
) => {
  const [placedImages, setPlacedImages] = useState<SceneImage[]>([]);

  useEffect(() => {
    if (!userImages || userImages.length === 0) {
      setPlacedImages([]);
      return;
    }

    const newPlacedImages: SceneImage[] = sceneImages
      .map((sceneImg) => {
        const match = userImages.find((img) =>
          sceneImg.image_url.endsWith(img.filename)
        );
        if (!match) return null;

        return {
          ...sceneImg,
          image_url: `data:image/png;base64,${match.base64Content}`,
        };
      })
      .filter((img): img is SceneImage => img !== null);

    setPlacedImages(newPlacedImages);
  }, [userImages, sceneImages]);

  return {
    placedImages,
    setPlacedImages,
  };
};