'use client';

import KonvaImageComponent from "@/app/components/konva_image";
import useSceneSocketReceiver from "@/app/hooks/Canva/useSceneSocketReceiver";
import { useSceneData } from "@/app/hooks/useSceneData";
import { useEffect, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { useSceneSocketSender } from "@/app/hooks/Canva/useSceneSocketSender";

export default function ScenePagePlayer() {
  const { scene, loading } = useSceneData();
  const [sceneId, setSceneId] = useState<string | null>(null);
  const pixels = 64;
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [cells, setCells] = useState<boolean[]>([]);
  const [images, setImages] = useState<SceneImage[]>([]);

  const { sendSceneState } = useSceneSocketSender(sceneId);

  useEffect(() => {
    if (!scene) return;
    const storedId = localStorage.getItem("sceneId");
    if (storedId) {
      setSceneId(storedId);
    }
    setWidth(scene.width);
    setHeight(scene.height);
    setCells(Array(scene.width * scene.height).fill(false));
  }, [scene]);

  useSceneSocketReceiver(sceneId, setImages);

  useEffect(() => {
    if (sceneId && images.length > 0) {
      sendSceneState(images);
    }
  }, [images]);

  if (loading || !scene || cells.length === 0) {
    return <p>Carregando Cena, aguarde...</p>;
  }

  return (
  <div>
    <Stage width={pixels * width} height={pixels * height}>
      {/* Image Layer */}
      <Layer>
        {images.map((img) => (
          <KonvaImageComponent
            key={img.id}
            src={`${img.base64Content}`}
            x={img.x_pos * pixels}
            y={img.y_pos * pixels}
            width={img.width * pixels}
            height={img.height * pixels}
          />
        ))}
      </Layer>

      {/* Grid Layer */}
      <Layer>
        {cells.map((_, i) => {
          const x = (i % width) * pixels;
          const y = Math.floor(i / width) * pixels;
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
