import { useRef } from 'react';
import { Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

export default function KonvaImageComponent({ src, x, y, width, height, onMove, onClick }: any) {
  //Utiliza o useRef papra não precisar renderizar a imagem novamente
  const imageRef = useRef(null);
  const [image] = useImage(src);

  return (
    <KonvaImage
      image={image}
      x={x}
      y={y}
      width={width}
      height={height}
      draggable
      onDragEnd={e => {
        onMove?.({ x: e.target.x(), y: e.target.y() });
      }}
      onClick={onClick}
      //container.style.cursor é referente ao cursor do navegador.
      onMouseEnter={e => {
        const container = e.target.getStage()?.container();
        if (container) container.style.cursor = 'move';
      }}
      onMouseLeave={e => {
        const container = e.target.getStage()?.container();
        if (container) container.style.cursor = 'default';
      }}//Referencia da imagem
      ref={imageRef}
    />
  );
}
