import {Image as KonvaImage} from 'react-konva';
import useImage from 'use-image';

export default function KonvaImageComponent({ src, x, y, width, height }: any){
  const [image] = useImage(src);
  return <KonvaImage image={image} x={x} y={y} width={width} height={height} />;
};