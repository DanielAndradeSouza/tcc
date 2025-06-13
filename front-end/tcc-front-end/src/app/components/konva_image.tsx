import { useRef } from 'react';
import { Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

export default function KonvaImageComponent({
  src,
  x,
  y,
  width,
  height,
  onMove,
  onClick,
  dragBoundFunc,
}: any) {
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
      onMouseEnter={e => {
        const container = e.target.getStage()?.container();
        if (container) container.style.cursor = 'move';
      }}
      onMouseLeave={e => {
        const container = e.target.getStage()?.container();
        if (container) container.style.cursor = 'default';
      }}
      ref={imageRef}
      dragBoundFunc={dragBoundFunc}
    />
  );
}
