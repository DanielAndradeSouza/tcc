import { useRef } from 'react';
import { Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

export default function KonvaImageComponent({ src, x, y, width, height, onMove }: any) {
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
      //Propriedade draggable
      draggable
      onDragEnd={e => {
        onMove?.({ x: e.target.x(), y: e.target.y() });
      }}
      onClick={() => {
        console.log('Imagem clicada!');
      }}
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
