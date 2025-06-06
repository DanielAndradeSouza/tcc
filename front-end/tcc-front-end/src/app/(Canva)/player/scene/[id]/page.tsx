'use client'


import useSceneSocketReceiver from "@/app/hooks/Canva/useSceneSocketReceiver";
import { useSceneData } from "@/app/hooks/useSceneData";
import { useEffect, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";

export default function ScenePagePlayer() {
  const { scene, loading } = useSceneData();
  const [ sceneId,setSceneId] = useState<string | null>(null);
  const pixels = 64;
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [cells, setCells] = useState<boolean[]>([]);
  const [images,setImages] = useState<SceneImage[]>([]);
  //useSceneSocketReceiver(sceneId, setImages);
  
  useEffect(() => {
    if (!scene) return;
    const storedId = localStorage.getItem("sceneId");
    if (storedId) {
      setSceneId(storedId);
    }
    setWidth(scene.width);
    setHeight(scene.height);
    setCells(Array(scene.width * scene.height).fill(false)); // Só para renderizar a grid
  }, [scene]);
  useSceneSocketReceiver(sceneId, setImages);
  if (loading || !scene || cells.length === 0) {
    return <p>Carregando Cena, aguarde...</p>;
  }

  return (
    <div>
      <Stage width={pixels * width} height={pixels * height}>
        {/* Layer do grid — só para visual, sem clique */}
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
