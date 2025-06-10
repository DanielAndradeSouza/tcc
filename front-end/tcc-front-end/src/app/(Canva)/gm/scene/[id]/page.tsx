'use client';

import ChangeGridModal from "@/app/components/modals/change_grid_modal";
import { UploadImage } from "@/app/components/modals/upload_image";
import { useSceneData } from "@/app/hooks/useSceneData";
import { fetchData } from "@/app/services/api";
import { BlueButton, ListButton } from "@/app/styles/buttons.style";
import { ImageItem, ImageList, Title } from "@/app/styles/toolBar.style";
import { useEffect, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { useTableTopImagesGm } from "@/app/hooks/Canva/useTableTopImagesGm";
import { v4 as uuidv4 } from "uuid";
import KonvaImageComponent from "@/app/components/konva_image";
import useSceneSocketReceiver from "@/app/hooks/Canva/useSceneSocketReceiver";
import { useSceneSocketSender } from "@/app/hooks/Canva/useSceneSocketSender";
import { DropDownSceneList } from "@/app/components/dropdown/dropdown_scenes_list";

export default function ScenePageGm() {
  const { scene, loading } = useSceneData();
  const pixels = 64;

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [cells, setCells] = useState<boolean[]>([]);

  const [modal, setModal] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const [userImages, setUserImages] = useState<{ filename: string; base64Content: string }[]>([]);
  const [imagesLoading, setImagesLoading] = useState<boolean>(true);
  const [positionImages, setPositionImages] = useState<SceneImage[]>([]);

  const sceneId = typeof window !== "undefined" ? localStorage.getItem("sceneId") : null;
  const { sendSceneState } = useSceneSocketSender(sceneId);
  const { placedImages, setPlacedImages } = useTableTopImagesGm(userImages, positionImages);
  const [manualPlacedImages, setManualPlacedImages] = useState<SceneImage[]>([]);
  
  // Envia atualizações via socket sempre que as imagens manuais forem atualizadas
  useEffect(() => {
    if (manualPlacedImages.length > 0) {
      sendSceneState(manualPlacedImages);
      console.log("Estado da cena emitido via socket (por modificação manual)");
    }
  }, [manualPlacedImages]);

  // Recebe atualizações via socket (caso o GM também queira escutar)
  useSceneSocketReceiver(sceneId || "", setManualPlacedImages);

  // Atualiza localmente a lista de imagens colocadas manualmente
  const updateSceneImages = (newImages: SceneImage[]) => {
    setManualPlacedImages(newImages);
  };

  const handleAddToScene = (img: { filename: string; base64Content: string }) => {
    const newImage: SceneImage = {
      id: uuidv4(),
      width: 1,
      height: 1,
      x_pos: 0,
      y_pos: 0,
      base64Content: `data:image/png;base64,${img.base64Content}`,
    };
    updateSceneImages([...manualPlacedImages, newImage]);
  };

  useEffect(() => {
    if (!scene) return;

    setWidth(scene.width);
    setHeight(scene.height);
    setCells(Array(scene.width * scene.height).fill(false));

    const fetchImages = async () => {
      try {
        const data = await fetchData(`scene_images/findAllFiles/${sceneId}`, {
          credentials: "include",
        });
        setUserImages(data || []);

        const positionImages = await fetchData(`scene_images/${sceneId}`, {
          credentials: "include",
        });
        setPositionImages(positionImages || []);
      } catch (error) {
        console.error("Erro ao buscar imagens", error);
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

  const toggleModal = () => setModal((prev) => !prev);
  const toggleUploadModal = () => setUploadModalOpen((prev) => !prev);

  return (
    <div>
      <DropDownSceneList />
      <Stage width={pixels * width} height={pixels * height}>
  {/* Layer do grid */}
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
          fill={active ? "rgba(135,206,250,0.3)" : "rgba(211,211,211,0.3)"}
          stroke="black"
          strokeWidth={1}
        />
      );
    })}
  </Layer>

  {/* Layer das imagens (com drag) */}
  <Layer>
    {[...placedImages, ...manualPlacedImages].map((img) => (
      <KonvaImageComponent
        key={`${img.id}-${img.x_pos}-${img.y_pos}`}
        src={img.base64Content || img.image_url}
        x={img.x_pos * pixels}
        y={img.y_pos * pixels}
        width={img.width * pixels}
        height={img.height * pixels}
        draggable={true}
        //Função passada no onMove
        onMove={({ x, y } : {x:number,y:number}) => {
          const updatedImages = [...placedImages, ...manualPlacedImages].map((i) =>
            i.id === img.id
              ? {
                //Calcula a posição que o x_pos e y_pos vai ficar ao final
                  ...i,
                  x_pos: Math.round(x / pixels),
                  y_pos: Math.round(y / pixels),
                }
              : i
          );
          //Atualiza o estado da imagem
          setManualPlacedImages(updatedImages);
        }}
      />
    ))}
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
                <BlueButton onClick={() => handleAddToScene(img)}>
                  Adicionar à Cena
                </BlueButton>
              </ImageItem>
            ))}
          </ImageList>
        )}
      </div>
    </div>
  );
}
