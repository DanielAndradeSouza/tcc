'use client'

import ChangeGridModal from "@/app/components/modals/change_grid_modal";
import { UploadImage } from "@/app/components/modals/upload_image";
import { useSceneData } from "@/app/hooks/useSceneData";
import { fetchData } from "@/app/services/api";
import { useEffect, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";

export default function ScenePage() {
  const { scene, loading } = useSceneData();
  const pixels = 64;
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [cells, setCells] = useState<boolean[]>([]);
  const [modal, setModal] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [userImages, setUserImages] = useState<
    { filename: string; base64Content: string }[]
  >([]);
  const [imagesLoading, setImagesLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!scene) return;

    // Atualiza o grid e as células
    setWidth(scene.width);
    setHeight(scene.height);
    setCells(Array(scene.width * scene.height).fill(false));

    // Busca as imagens do usuário
    const fetchImages = async () => {
      try {
        const data = await fetchData(
          `scene_images/findAllFiles/${localStorage.getItem("sceneId")}`,
          { credentials: 'include' }
        );
        console.log(data);
        setUserImages(data || []); // garante que sempre vai um array
      } catch (error) {
        console.error('Erro ao buscar imagens', error);
        setUserImages([]); // garante um array vazio em caso de falha
      } finally {
        setImagesLoading(false);
      }
    };

    setImagesLoading(true);
    fetchImages();
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
        <button onClick={toggleUploadModal} style={{ marginLeft: 10 }}>
          Upload de Imagem
        </button>
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

      <div style={{ marginTop: 20 }}>
        <h3>Imagens do Usuário:</h3>
        {imagesLoading ? (
          <p>Carregando imagens...</p>
        ) : userImages.length === 0 ? (
          <p>Nenhuma imagem encontrada</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {userImages.map((img, index) => (
              <div key={index}>
                <img
                  src={`data:image/png;base64,${img.base64Content}`}
                  alt={img.filename}
                  width={100}
                  height={100}
                  style={{ objectFit: 'cover', border: '1px solid #ccc' }}
                />
                <p style={{ textAlign: 'center', fontSize: 12 }}>{img.filename}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
