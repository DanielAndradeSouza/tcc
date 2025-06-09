import { useEffect, useRef, useState } from 'react';
import {Image as KonvaImage} from 'react-konva';
import useImage from 'use-image';

export default function KonvaImageComponent({ src, x, y, width, height,onMove }: any){
  const imageRef = useRef(null);
  const [imageMove, setImageMove] = useState<HTMLImageElement | null>(null);
  const [image] = useImage(src);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      setImageMove(img);
    }
  },[src])
  return <KonvaImage image={image} x={x} y={y} width={width} height={height} 
  onDragEnd={e => {
    
  }}
  />;
};