'use client'

import { useSceneData } from "@/app/hooks/useSceneData";
import { fetchData } from "@/app/services/api";
import { useEffect, useState } from "react";
import { Stage, Layer, Rect, Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import { useSceneSocket } from "@/app/hooks/Canva/useSceneSocket";

export default function ScenePagePlayer() {
  const { scene, loading } = useSceneData();
  const pixels = 64;

  const [positionImages, setPositionImages] = useState<SceneImage[]>([]);

  useSceneSocket({
    sceneId: localStorage.getItem("sceneId") || "",
    manualPlacedImages: positionImages,
    setManualPlacedImages: setPositionImages,
  });

  useEffect(() => {
    const sceneId = localStorage.getItem("sceneId");
    if (!scene || !sceneId) return;

    const fetchImages = async () => {
      try {
        const positionImages = await fetchData(
          `scene_images/${sceneId}`,
          { credentials: 'include' }
        );
        setPositionImages(positionImages || []);
      } catch (error) {
        console.error('Erro ao buscar imagens posicionadas', error);
      }
    };

    fetchImages();
  }, [scene]);

  if (loading || !scene) {
    return <p>Carregando Cena, aguarde...</p>;
  }

  const KonvaImageComponent = ({ src, x, y, width, height }: any) => {
    const [image] = useImage(src);
    return <KonvaImage image={image} x={x} y={y} width={width} height={height} />;
  };

  return (
    <div>
      <Stage width={pixels * scene.width} height={pixels * scene.height}>
        <Layer>
          {positionImages.map((img) => (
            <KonvaImageComponent
              key={img.id}
              src={img.image_url}
              x={img.x_pos * pixels}
              y={img.y_pos * pixels}
              width={img.width * pixels}
              height={img.height * pixels}
            />
          ))}
        </Layer>
        <Layer>
          {Array(scene.width * scene.height).fill(null).map((_, i) => {
            const x = (i % scene.width) * pixels;
            const y = Math.floor(i / scene.width) * pixels;
            return (
              <Rect
                key={i}
                x={x}
                y={y}
                width={pixels}
                height={pixels}
                fill="rgba(211,211,211,0.3)"
                stroke="black"
                strokeWidth={2}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
}
