'use client';

import useSceneSocketReceiver from "@/app/hooks/Canva/useSceneSocketReceiver";
import { useSceneData } from "@/app/hooks/useSceneData";
import { useEffect, useState } from "react";
import { Stage, Layer, Rect, Image as KonvaImage } from "react-konva";
import { fetchData } from "@/app/services/api";
import useImage from "use-image";

export default function ScenePagePlayer() {
  const { scene, loading } = useSceneData();
  const [sceneId, setSceneId] = useState<string | null>(null);
  const pixels = 64;

  const [positionImages, setPositionImages] = useState<SceneImage[]>([]);
  const [cells, setCells] = useState<boolean[]>([]);

  // Hook de sincronização com socket
  useSceneSocketReceiver(sceneId, setPositionImages);

  useEffect(() => {
    const storedId = localStorage.getItem("sceneId");
    if (storedId) {
      setSceneId(storedId);
    }
  }, []);

  useEffect(() => {
    if (!scene || !sceneId) return;

    const fetchImages = async () => {
      try {
        const positionImages = await fetchData(`scene_images/${sceneId}`, {
          credentials: 'include',
        });
        setPositionImages(positionImages || []);
      } catch (error) {
        console.error("Erro ao buscar imagens posicionadas", error);
      }
    };

    setCells(Array(scene.width * scene.height).fill(false));
    fetchImages();
  }, [scene, sceneId]);

  if (loading || !scene || cells.length === 0) {
    return <p>Carregando Cena, aguarde...</p>;
  }

  const KonvaImageComponent = ({
    src,
    x,
    y,
    width,
    height,
  }: {
    src: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }) => {
    const [image] = useImage(src);
    return <KonvaImage image={image} x={x} y={y} width={width} height={height} />;
  };

  return (
    <div>
      <Stage width={pixels * scene.width} height={pixels * scene.height}>
        {/* Camada de imagens */}
        <Layer listening={false}>
          {positionImages
            .filter((img) => typeof img.image_url === "string") // <- filtrando aqui
            .map((img) => (
              <KonvaImageComponent
                key={img.id}
                src={img.image_url!} // <- garantido pelo filter
                x={img.x_pos * pixels}
                y={img.y_pos * pixels}
                width={img.width * pixels}
                height={img.height * pixels}
              />
            ))}
        </Layer>
        {/* Camada do grid */}
        <Layer listening={false}>
          {cells.map((_, i) => {
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
                strokeWidth={1}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
}
