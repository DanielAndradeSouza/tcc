'use client'

import ChangeGridModal from "@/app/components/modals/change_grid_modal";
import { UploadImage } from "@/app/components/modals/upload_image";
import { useSceneData } from "@/app/hooks/useSceneData"
import { useEffect, useState } from "react";
import { Stage, Layer, Rect } from "react-konva"

export default function ScenePage(){
  const { scene, loading } = useSceneData();
  const pixels = 64;
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [cells, setCells] = useState<boolean[]>([]);
  const [modal, setModal] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  useEffect(() => {
    if (scene) {
      setWidth(scene.width);
      setHeight(scene.height);
      setCells(Array(scene.width * scene.height).fill(false));
    }
  }, [scene]);

  if (loading || !scene || cells.length === 0) {
    return <p>Carregando Cena aguarde...</p>;
  }

  const toggleModal = () => setModal(prev => !prev);
  const toggleUploadModal = () => setUploadModalOpen(prev => !prev);

  const toggleCell = (index: number) => {
    const newCells = [...cells];
    newCells[index] = !newCells[index];
    setCells(newCells);
  };

  return (
    <div>
      <Stage width={pixels * width} height={pixels * height}>
        <Layer>
          {cells.map((active, i) => {
            const x = (i % width) * pixels;
            const y = Math.floor(i / width) * pixels;
            return (
              <Rect
                key={i}
                x={x}
                y={y}
                width={pixels}
                height={pixels}
                fill={active ? 'skyblue' : 'lightgray'}
                stroke="black"
                strokeWidth={2}
                onClick={() => toggleCell(i)}
              />
            );
          })}
        </Layer>
      </Stage>

      <div>
        <button onClick={toggleModal}>Modificar Cena</button>
        <button onClick={toggleUploadModal} style={{ marginLeft: 10 }}>Upload de Imagem</button>
      </div>

      {modal && (
          <ChangeGridModal 
            scene={scene} 
            isOpen={true} 
            onClose={toggleModal} 
            onUpdate={(newWidth, newHeight) => {
              setWidth(newWidth);
              setHeight(newHeight);
              scene.width = newWidth;
              scene.height = newHeight;
              setCells(Array(newWidth * newHeight).fill(false));
            }}
          />
      )}
      <UploadImage isOpen={uploadModalOpen} onClose={toggleUploadModal} />

    </div>
  );
}
