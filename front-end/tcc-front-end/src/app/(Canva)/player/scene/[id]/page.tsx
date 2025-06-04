'use client'

import { useSceneData } from "@/app/hooks/useSceneData";
import { fetchData } from "@/app/services/api";
import { useEffect, useState } from "react";
import { Stage, Layer, Rect, Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import { useTableTopImagesPlayer } from "@/app/hooks/Canva/useTableTopImagesPlayer";

export default function ScenePagePlayer() {
  const { scene, loading } = useSceneData();

  const pixels = 64;
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [cells, setCells] = useState<boolean[]>([]);

  const [userImages, setUserImages] = useState<
    { filename: string; base64Content: string }[]
  >([]);
  const [imagesLoading, setImagesLoading] = useState<boolean>(true);
  const [positionImages, setPositionImages] = useState<SceneImage[]>([]);

  const { placedImages } = useTableTopImagesPlayer(positionImages);


  useEffect(() => {
    if (!scene) return;

    setWidth(scene.width);
    setHeight(scene.height);
    setCells(Array(scene.width * scene.height).fill(false)); // Só para renderizar a grid

    const fetchImages = async () => {
      try {
        const data = await fetchData(
          `scene_images/findAllFiles/${localStorage.getItem("sceneId")}`,
          { credentials: 'include' }
        );
        setUserImages(data || []);

        const positionImages = await fetchData(
          `scene_images/${localStorage.getItem("sceneId")}`,
          { credentials: 'include' }
        );
        setPositionImages(positionImages || []);
      } catch (error) {
        console.error('Erro ao buscar imagens', error);
        setUserImages([]);
      } finally {
        setImagesLoading(false);
      }
    };

    setImagesLoading(true);
    fetchImages();
  }, [scene]);

  if (loading || !scene || cells.length === 0) {
    return <p>Carregando Cena, aguarde...</p>;
  }

  const KonvaImageComponent = ({ src, x, y, width, height }: any) => {
    const [image] = useImage(src);
    return <KonvaImage image={image} x={x} y={y} width={width} height={height} />;
  };

  return (
    <div>
      <Stage width={pixels * width} height={pixels * height}>

        {/* Layer das imagens — fica embaixo */}
        <Layer>
          {placedImages.map((img) => (
            <KonvaImageComponent
              key={img.id}
              src={img.image_url}
              x={(img.x_pos) * pixels}
              y={(img.y_pos) * pixels}
              width={img.width * pixels}
              height={img.height * pixels}
            />
          ))}
        </Layer>

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

      {imagesLoading && <p>Carregando imagens...</p>}
    </div>
  );
}
