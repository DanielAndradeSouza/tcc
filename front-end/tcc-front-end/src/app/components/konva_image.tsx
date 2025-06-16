import { useEffect, useRef, useState } from 'react';
import { Image as KonvaImage, Transformer } from 'react-konva';
import useImage from 'use-image';

export default function KonvaImageComponent({
  src,
  x,
  y,
  width,
  height,
  onMove,
  onClick,
  isSelected,
  onTransform,
  dragBoundFunc,
}: any) {
  const imageRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  const [image] = useImage(src);

  useEffect(() => {
    if (isSelected && trRef.current && imageRef.current) {
      trRef.current.nodes([imageRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaImage
        image={image}
        x={x}
        y={y}
        width={width}
        height={height}
        draggable
        onClick={onClick}
        onDragEnd={(e) => {
          onMove?.({ x: e.target.x(), y: e.target.y() });
        }}
        onTransformEnd={(e) => {
          const node = imageRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          onTransform?.({
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
          });
        }}
        onMouseEnter={(e) => {
          const container = e.target.getStage()?.container();
          if (container) container.style.cursor = 'move';
        }}
        onMouseLeave={(e) => {
          const container = e.target.getStage()?.container();
          if (container) container.style.cursor = 'default';
        }}
        ref={imageRef}
        dragBoundFunc={dragBoundFunc}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
}
