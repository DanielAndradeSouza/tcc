'use client'

import ChangeGridModal from "@/app/components/modals/change_grid_modal";
import { UploadImage } from "@/app/components/modals/upload_image";
import { useSceneData } from "@/app/hooks/useSceneData";
import { fetchData } from "@/app/services/api";
import { BlueButton, ListButton } from "@/app/styles/buttons.style";
import { ImageItem, ImageList, Title } from "@/app/styles/toolBar.style";
import { useEffect, useState } from "react";
import { Stage, Layer, Rect, Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import { useTabletopImages } from "@/app/hooks/Canva/useTableTopImages";

export default function ScenePageGm() {
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
  const [positionImages, setPositionImages] = useState<SceneImage[]>([]);

  // Hook que junta as imagens do GM com as imagens da cena
  const { placedImages, setPlacedImages } = useTabletopImages(userImages, positionImages);

  useEffect(() => {
    if (!scene) return;

    setWidth(scene.width);
    setHeight(scene.height);
    setCells(Array(scene.width * scene.height).fill(false));

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

  const toggleModal = () => setModal(prev => !prev);
  const toggleUploadModal = () => setUploadModalOpen(prev => !prev);

  const toggleCell = (index: number) => {
    const newCells = [...cells];
    newCells[index] = !newCells[index];
    setCells(newCells);
  };

  // Helper para carregar a imagem do Konva
  const KonvaImageComponent = ({ src, x, y, width, height }: any) => {
    const [image] = useImage(src);
    console.log("Imagem ID:", width,height);

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

  {/* Layer do grid — fica por cima */}
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
          fill={active ? 'rgba(135,206,250,0.3)' : 'rgba(211,211,211,0.3)'}
          stroke="black"
          strokeWidth={2}
          onClick={() => toggleCell(i)}
        />
      );
    })}
  </Layer>
</Stage>


      <ListButton>
        <BlueButton onClick={toggleModal}>Modificar Cena</BlueButton>
        <BlueButton onClick={toggleUploadModal}>Upload de Imagem</BlueButton>
      </ListButton>

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

      <div>
        {imagesLoading ? (
          <p>Carregando imagens...</p>
        ) : userImages.length === 0 ? (
          <p>Nenhuma imagem encontrada</p>
        ) : (
          <ImageList>
            <Title>Imagens do Usuário:</Title>
            {userImages.map((img, index) => (
              <ImageItem key={index}>
                <img
                  src={`data:image/png;base64,${img.base64Content}`}
                  alt={img.filename}
                />
                <p>{img.filename}</p>
                {/* Aqui você pode implementar o botão para adicionar manualmente ao tabletop */}
              </ImageItem>
            ))}
          </ImageList>
        )}
      </div>
    </div>
  );
}
